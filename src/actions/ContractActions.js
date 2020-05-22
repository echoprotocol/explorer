import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, fromJS, Map } from 'immutable';
import { batchActions } from 'redux-batched-actions';
import * as wrapper from 'solc/wrapper';
import Router from 'next/router';

import {
	CONTRACT_FIELDS,
	MIN_ACCESS_VERSION_BUILD,
} from '../constants/GlobalConstants';
import { MODAL_ERROR, MODAL_SUCCESS } from '../constants/ModalConstants';
import { FORM_CONTRACT_VERIFY, FORM_MANAGE_CONTRACT } from '../constants/FormConstants';
import { CONTRACT_ABI, SSR_CONTRACT_DETAILS_PATH, SSR_CONTRACT_PATH } from '../constants/RouterConstants';

import FormatHelper from '../helpers/FormatHelper';
import URLHelper from '../helpers/URLHelper';
import { jsonParse } from '../helpers/FunctionHelper';

import ContractReducer from '../reducers/ContractReducer';

import BaseActionsClass from './BaseActionsClass';
import TransactionActions from './TransactionActions';
import ModalActions from './ModalActions';
import FormActions from './FormActions';
import GlobalActions from './GlobalActions';
import AccountActions from './AccountActions';

import ContractHelper from '../helpers/ContractHelper';
import FileLoaderHelper from '../helpers/FileLoaderHelper';
import ValidateHelper, {
	validateContractDescription,
	validateContractIcon,
	validateContractName,
	checkAccessVersion,
} from '../helpers/ValidateHelper';

import ApiService from '../services/ApiService';
import { BridgeService } from '../services/BridgeService';
import { getContractInfo, getTotalHistory } from '../services/queries/contract';

import { loadScript } from '../api/ContractApi';
import { COMPILER_CONSTS } from '../constants/ContractConstants';

import { CONTRACT_GRID, ERC20_GRID } from '../constants/TableConstants';
import { getHistory as getContractHistory } from '../services/queries/history';
import GridActions from './GridActions';
import config from '../config/chain';

class ContractActions extends BaseActionsClass {

	/**
	 * @method formatHistoryFromEchoDB
	 * @param history
	 * @return {*}
	 */
	formatHistoryFromEchoDB(history) {
		return history.map((data) => {
			const operationId = parseInt(data.id, 10);
			return ({
				id: operationId,
				op: [operationId, data.body],
				result: [0, data.result],
				block_num: data.transaction ? data.transaction.block.round : data.block.round,
				trx_in_block: data.trx_in_block,
				op_in_trx: data.op_in_trx,
				virtual_op: 0,
			});
		});
	}

	/**
	 * Format contract history
	 * @param {Array} transactions
	 * @returns {function}
	 */
	async formatContractHistory(transactions) {

		let history = transactions.map(async (t) => {
			const { op: operation, result } = t;
			const block = await echo.api.getBlock(t.block_num);
			return TransactionActions.getOperation(
				operation,
				t.block_num,
				block ? block.timestamp : null,
				t.trx_in_block,
				t.op_in_trx,
				result,
				null,
				null,
				t.id,
				t.virtual,
				true,
			);
		});

		history = await Promise.all(history);

		return history;
	}

	/**
	 * Get contract info
	 * @param {string} id
	 * @returns {function}
	 */
	getContractInfo(id) {
		return async (dispatch) => {

			let contractOwner = null;
			if (!validators.isContractId(id)) {
				dispatch(GlobalActions.toggleErrorPath(true));
				return { owner: contractOwner };
			}

			dispatch(this.setValue('loading', true));
			try {
				const contract = await echo.api.getContract(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return { owner: contractOwner };
				}

				let [balances, { owner }] = await Promise.all([
					echo.api.getContractBalances(id),
					echo.api.getObject(id),
					dispatch(this.getContractInfoFromExplorer(id)),
					dispatch(this.getContractInfoFromGraphql(id)),
					dispatch(this.loadContractHistory(id)),
				]);

				const assets = await echo.api.getObjects(balances.map((b) => b.asset_id));
				owner = new Map(await echo.api.getObject(owner));

				balances = balances.map((balance, index) => {
					const asset = assets.find(({ id: assetId }) => assetId === balance.asset_id);
					return ({
						id: index,
						amount: balance.amount,
						asset: new Map(asset),
					});
				});
				dispatch(this.setMultipleValue({
					bytecode: contract[1].code,
					balances: new List(balances),
					owner,
				}));
				contractOwner = owner;
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
			return { owner: contractOwner };
		};
	}

	/**
	 * Load contract history
	 * @param {string} contractId
	 * @returns {function}
	 */
	loadContractHistory(contractId) {
		return async (dispatch, getState) => {
			try {
				const queryData = getState().grid.get(CONTRACT_GRID).toJS();
				dispatch(this.setValue('loadingMoreHistory', true));
				const subject = contractId;
				const getObjectId = async (objectId) => {
					if (!objectId) { return; }
					let account = null;
					try {
						account = await echo.api.getAccountByName(objectId.trim());
						if (account) {
							account = account.id;
						}
						// eslint-disable-next-line no-empty
					} catch (err) {}
					// eslint-disable-next-line consistent-return
					return account;
				};

				const [fromFilter, toFilter] = await Promise.all([
					getObjectId(queryData.filters.from),
					getObjectId(queryData.filters.to),
				]);

				let items = [];
				let total = 0;

				try {
					({ items, total } = await getContractHistory({
						subject,
						fromFilter: fromFilter || undefined,
						toFilter: toFilter || undefined,
						offset: (queryData.currentPage - 1) * queryData.sizePerPage,
						count: queryData.sizePerPage,
						operations: Object.keys(OPERATIONS_IDS),
					}));
				} catch (err) {
					console.log('EchoDB error', err);
				}

				dispatch(GridActions.setTotalDataSize(CONTRACT_GRID, total));
				let transactions = this.formatHistoryFromEchoDB(items);
				transactions = await this.formatContractHistory(transactions);
				dispatch(this.setValue('history', new List(transactions)));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	loadErc20History(contractId) {
		return async (dispatch, getState) => {
			try {
				const queryData = getState().grid.get(ERC20_GRID).toJS();
				dispatch(this.setValue('loadingMoreHistory', true));
				const subject = contractId;
				const getObjectId = async (objectId) => {
					if (!objectId) { return; }
					let account = null;
					try {
						account = await echo.api.getAccountByName(objectId.trim());
						if (account) {
							account = account.id;
						}
						// eslint-disable-next-line no-empty
					} catch (err) { }
					// eslint-disable-next-line consistent-return
					return account;
				};

				const [fromFilter, toFilter] = await Promise.all([
					getObjectId(queryData.filters.from),
					getObjectId(queryData.filters.to),
				]);
				try {
					const options = {
						from: fromFilter,
						to: toFilter,
						offset: (queryData.currentPage - 1) * queryData.sizePerPage,
						count: queryData.sizePerPage,
					};
					await dispatch(this.getContractInfoFromGraphql(subject, options));
				} catch (err) {
					console.log('EchoDB error', err);
				}
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	/**
	 * Update contract info
	 * @param {string} contractId
	 * @returns {function}
	 */
	updateContractInfo(contractId) {
		return async (dispatch) => {
			try {
				let balances = await echo.api.getContractBalances(contractId);
				await echo.api.getObjects(balances.map((b) => b.asset_id));
				balances = fromJS(balances);
				await dispatch(this.loadContractHistory(contractId));
				dispatch(batchActions([
					this.reducer.actions.set({ field: 'balances', value: balances }),
				]));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			}
		};
	}

	contractCompilerInit() {
		return async (dispatch) => {
			const list = await ApiService.getSolcList();
			list.builds = list.builds.filter(({ version }) => checkAccessVersion(version, MIN_ACCESS_VERSION_BUILD));
			dispatch(this.setValue('compilersList', list));
			const solcLatestRelease = list.latestRelease ? list.releases[list.latestRelease] : list.builds[list.builds.length - 1].path;
			const lastVersion = list.builds.find((b) => b.path === solcLatestRelease);
			dispatch(FormActions.setFormValue(
				FORM_CONTRACT_VERIFY,
				'currentCompiler',
				lastVersion && lastVersion.longVersion,
			));
			await loadScript(`${config.SOLC_BIN_URL}${solcLatestRelease}`); // eslint-disable-line no-undef
		};
	}

	changeContractCompiler(version) {
		return async (dispatch, getState) => {
			const downloadedVersions = getState().contract.get('downloadedCompilers');
			const buildsList = getState().contract.getIn(['compilersList', 'builds']);
			dispatch(FormActions.setFormValue(
				FORM_CONTRACT_VERIFY,
				'currentCompiler',
				version,
			));
			const compilerBuild = buildsList.find((build) => build.get('longVersion') === version);

			if (!downloadedVersions.includes(version)) {
				dispatch(this.setValue('downloadedCompilers', downloadedVersions.add(version)));

				// eslint-disable-next-line no-undef
				const response = await fetch(`${config.SOLC_BIN_URL}${compilerBuild.get('path')}`);
				const total = Number.parseInt(response.headers.get('content-length'), 10);
				const reader = response.body.getReader();
				let bytesReceived = 0;
				const chunks = [];

				while (true) {
					// eslint-disable-next-line no-await-in-loop
					const { done, value } = await reader.read();
					if (done) {
						dispatch(this.setValue('progress', 0));
						break;
					}

					chunks.push(value);
					bytesReceived += value.length;

					const progress = Math.min(99, Math.floor((bytesReceived * 100) / (total * 4.8)));
					dispatch(this.setValue('progress', progress));
				}

				const chunksAll = new Uint8Array(bytesReceived);
				let position = 0;

				// eslint-disable-next-line no-restricted-syntax
				for (const chunk of chunks) {
					chunksAll.set(chunk, position);
					position += chunk.length;
				}

				const script = document.createElement('script');
				script.innerHTML = new TextDecoder('utf-8').decode(chunksAll);

				if (window.Module) {
					window.Module = undefined;
				}

				document.getElementsByTagName('head')[0].appendChild(script);
			}
			const code = getState().form.getIn([FORM_CONTRACT_VERIFY, 'code']);
			if (!code) {
				return;
			}
			await dispatch(this.contractCodeCompile(code));
		};
	}

	contractCodeCompile(code, filename = 'test.sol', attempt = 1) {
		return async (dispatch, getState) => {
			if (!code) {
				code = getState().form.getIn([FORM_CONTRACT_VERIFY, 'code']);
			}
			try {
				const input = {
					language: 'Solidity',
					sources: {
						[filename]: {
							content: code,
						},
					},
					settings: {
						outputSelection: {
							'*': {
								'*': ['*'],
							},
						},
					},
				};

				if (code) {
					dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'code', code));
				}

				if (!code) {
					dispatch(this.setValue('contracts', new Map({})));
					dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractName', ''));
					dispatch(FormActions.setFormError(FORM_CONTRACT_VERIFY, 'currentCompiler', null));
					return;
				}

				const solc = wrapper(window.Module);
				const output = JSON.parse(solc.compile(JSON.stringify(input)));
				const errors = this.getErrors(output);
				if (errors.length) {
					throw new Error(errors);
				}
				let contracts = new Map({});
				contracts = contracts.withMutations((contractsMap) => {
					Object.entries(output.contracts[filename]).forEach(([name, contract]) => {
						const construct = contract.abi.find((abi) => abi.type === 'constructor');
						if (!construct) {
							return contractsMap.set(name, []);
						}
						return contractsMap.set(name, construct.inputs);
					});
				});
				dispatch(this.setValue('contracts', contracts));
				dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractName', contracts.keySeq().first()));
				dispatch(FormActions.setFormError(FORM_CONTRACT_VERIFY, 'currentCompiler', null));
			} catch (err) {
				if (err.message.indexOf(COMPILER_CONSTS.SOLC_NOT_ENOUGH_STACK_ERROR) !== -1
					&& attempt < COMPILER_CONSTS.MAX_TRIES_TO_COMPILE) {
					dispatch(this.contractCodeCompile(code, filename, attempt + 1));
				} else {
					dispatch(FormActions.setFormError(FORM_CONTRACT_VERIFY, 'currentCompiler', 'Invalid contract code'));
					dispatch(this.setValue('contracts', new Map({})));
					dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractName', ''));
				}
			}
		};
	}
	getErrors(output) {
		const { errors } = output;
		if (!errors) {
			return [];
		}
		return errors.map((err) => err.formattedMessage);
	}
	manageContract(contractId, name, icon, description, clickSaveCounter) {
		return async (dispatch, getState) => {

			const isAccessBridge = await dispatch(GlobalActions.checkAccessToBridge());
			if (!isAccessBridge) return;

			const isExistActiveAccount = await dispatch(AccountActions.checkActiveAccount());
			if (!isExistActiveAccount) return;

			const ownerName = getState().contract.getIn(['owner', 'name']);
			const ownerId = getState().contract.getIn(['owner', 'id']);
			let activeAccountId = getState().global.getIn(['activeAccount', 'id']) || BridgeService.getAccount().id;
			if (!activeAccountId) {
				const access = await BridgeService.getAccess();
				if (!access) return;
				await new Promise((resolve) =>
					setTimeout(() => {
						resolve();
					}, 300));
				activeAccountId = BridgeService.getAccount().id;
				if (!activeAccountId) {
					const accounts = await BridgeService.getAllAcounts();
					const activeAccount = accounts.find((ac) => ac.active);
					activeAccountId = activeAccount && activeAccount.id;
				}
			}
			if (activeAccountId !== ownerId) {
				dispatch(ModalActions.openModal(
					MODAL_ERROR,
					{ title: `Only account ${ownerName} can manage this contract` },
				));
				return;
			}

			try {
				if (clickSaveCounter > 4) return;
				dispatch(this.setValue('clickSaveCounter', clickSaveCounter + 1));

				const message = ContractHelper.getMessageToManageContract(contractId);
				const signature = await BridgeService.proofOfAuthority(message, activeAccountId);

				const formData = new FormData();
				formData.append('signature', signature);
				formData.append('message', message);
				formData.append('name', name);
				if (icon) {
					formData.append('icon', icon);
				}
				if (description) {
					formData.append('description', description);
				}
				formData.append('accountId', activeAccountId);
				const result = await ApiService.changeContract(contractId, formData);

				dispatch(this.setMultipleValue({
					name: result.name,
					description: result.description || '',
					icon: result.icon || '',
				}));

				dispatch(FormActions.setValue(FORM_MANAGE_CONTRACT, 'isChangedForm', false));
			} catch (err) {
				const getCurrentCount = getState().contract.get('clickSaveCounter');
				if (getCurrentCount > 0) {
					dispatch(this.setValue('clickSaveCounter', getCurrentCount - 1));
				}
				const { value } = getState().form.getIn([FORM_MANAGE_CONTRACT, 'contractId']);
				if (value === contractId) { dispatch(ModalActions.openModal(MODAL_ERROR, { title: err.message })); }
			}
		};
	}

	validateContract(field, newValue) {
		return (dispatch) => {
			let error = null;

			switch (field) {
				case CONTRACT_FIELDS.NAME:
					error = validateContractName(newValue);
					break;
				case CONTRACT_FIELDS.DESCRIPTION:
					error = validateContractDescription(newValue);
					break;
				case CONTRACT_FIELDS.ICON:
					error = validateContractIcon(newValue);
					if (error) {
						dispatch(FormActions.setFormValue(FORM_MANAGE_CONTRACT, 'icon', ''));
						dispatch(FormActions.setFormValue(FORM_MANAGE_CONTRACT, 'iconBase64', ''));
					}
					break;
				default:
			}

			dispatch(FormActions.setFormError(FORM_MANAGE_CONTRACT, field, error));
			dispatch(this.checkValidateForm());
			dispatch(this.checkChangesForm());
		};
	}

	setDefaultDateContract(contractId) {
		return (dispatch, getState) => {
			const name = getState().contract.get('name');
			const description = getState().contract.get('description');
			const icon = getState().contract.get('icon');
			dispatch(FormActions.setMultipleFormValue(FORM_MANAGE_CONTRACT, {
				name, description, icon, iconBase64: '', contractId,
			}));
			dispatch(FormActions.setValue(FORM_MANAGE_CONTRACT, 'isChangedForm', false));
		};
	}

	checkValidateForm() {
		return async (dispatch, getState) => {
			const name = getState().form.getIn([FORM_MANAGE_CONTRACT, 'name']);
			const description = getState().form.getIn([FORM_MANAGE_CONTRACT, 'description']);
			const icon = getState().form.getIn([FORM_MANAGE_CONTRACT, 'icon']);

			const isValidForm = !name.error && !!name.value &&
				!icon.error && !description.error;

			dispatch(FormActions.setValue(FORM_MANAGE_CONTRACT, 'isErrorForm', !isValidForm));
		};
	}

	checkChangesForm() {
		return async (dispatch, getState) => {
			const nameContract = getState().contract.get('name');
			const descriptionContract = getState().contract.get('description');
			const iconContract = getState().contract.get('icon');

			const name = getState().form.getIn([FORM_MANAGE_CONTRACT, 'name']);
			const description = getState().form.getIn([FORM_MANAGE_CONTRACT, 'description']);
			const icon = getState().form.getIn([FORM_MANAGE_CONTRACT, 'icon']);

			const isChangedForm = nameContract !== name.value || descriptionContract !== description.value || iconContract !== icon.value;
			dispatch(FormActions.setValue(FORM_MANAGE_CONTRACT, 'isChangedForm', isChangedForm));
		};
	}

	setContractIcon(file) {
		return (dispatch, getState) => {
			const icon = getState().form.getIn([FORM_MANAGE_CONTRACT, 'icon']);
			if (icon && icon.error) return;
			FileLoaderHelper.loadFile(file).then((loadIcon) => {
				dispatch(FormActions.setFormValue(FORM_MANAGE_CONTRACT, 'icon', file));
				dispatch(FormActions.setFormValue(FORM_MANAGE_CONTRACT, 'iconBase64', loadIcon));
				dispatch(this.checkValidateForm());
				dispatch(this.checkChangesForm());
			}).catch((error) => dispatch(FormActions.setFormError(FORM_MANAGE_CONTRACT, 'icon', error.message)));
		};
	}

	abiApprove(id, abi) {
		return async (dispatch) => {
			try {
				const parsedAbi = jsonParse(abi);

				if (!parsedAbi) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: 'Invalid JSON' }));
					return;
				}

				const response = await ApiService.setAbi({ id, abi: parsedAbi });

				if (response.error) {
					dispatch(ModalActions.openModal(MODAL_ERROR, { title: response.error.message }));
					return;
				}

				dispatch(this.setValue('abi', FormatHelper.formatAbi(response.abi)));
				dispatch(ModalActions.openModal(MODAL_SUCCESS, { title: 'ABI successfully uploaded' }));
				Router.push(SSR_CONTRACT_DETAILS_PATH, URLHelper.createContractUrl(id, CONTRACT_ABI));
			} catch (err) {
				dispatch(ModalActions.openModal(MODAL_ERROR, { title: FormatHelper.formatServerError(err) }));
			}
		};
	}

	/**
	 *
	 * @string contractId
	 * @returns {Function}
	 */
	getContractInfoFromExplorer(contractId) {
		return async (dispatch) => {
			try {
				const contract = await ApiService.getContractInfo(contractId);

				/* eslint-disable*/
				const {
					users_has_liked: stars = [],
					name = '',
					description = '',
					icon = '',
					source_code: sourceCode = '',
					abi = '',
					compiler_version: compilerVersion = '',
					verified = false,
				} = contract;
				/* eslint-disable */

				dispatch(this.setMultipleValue({
					name,
					description,
					icon,
					sourceCode,
					abi: FormatHelper.formatAbi(abi),
					compilerVersion,
					verified,
					stars: fromJS(stars),
				}));


			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			}
		};
	}

	updateConstructorParamsForm() {
		return (dispatch, getState) => {
			const contractName = getState().form.getIn([FORM_CONTRACT_VERIFY, 'contractName']);
			const contracts = getState().contract.get('contracts');

			if (!contractName || !contracts.size) {
				dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractInputs', new Map({})));
				return;
			}

			let contractInputs = new Map({});

			if (!contracts.get(contractName)) {
				return;
			}

			contractInputs = contractInputs.withMutations((contractsMap) => {
				contracts.get(contractName).forEach(({ name, type }) => {
					contractsMap.set(name, { value: '', error: null, type });
				});
			});

			dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractInputs', contractInputs));
		};
	}

	contractVerifyApprove(id) {
		return async (dispatch, getState) => {
			const contractInputs = getState().form.getIn([FORM_CONTRACT_VERIFY, 'contractInputs']);
			let isError = false;

			contractInputs.forEach((input, name) => {
				if (!input.value) {
					return;
				}

				const error = ValidateHelper.validateByType(input.value, input.type);

				if (error) {
					isError = true;
					dispatch(FormActions.setInFormError(FORM_CONTRACT_VERIFY, ['contractInputs', name], error));
				}
			});

			if (isError) {
				return;
			}

			const form = getState().form.get(FORM_CONTRACT_VERIFY);

			dispatch(FormActions.toggleLoading(FORM_CONTRACT_VERIFY, true));

			try {
				const version = getState().contract.getIn(['compilersList', 'builds'])
					.find((build) => build.get('longVersion') === form.get('currentCompiler').value);

				const response = await ApiService.verifyContract({
					id,
					name: form.get('contractName'),
					compiler_version: version.toJS(),
					source_code: form.get('code'),
					inputs: form.get('contractInputs').filter((i) => i.value).map((input) => ({
						arg: input.value,
						type: input.type,
					})).toArray(),
				});

				dispatch(this.setMultipleValue({
					verified: response.verified,
					abi: FormatHelper.formatAbi(response.abi),
					sourceCode: response.source_code,
				}));
				dispatch(ModalActions.openModal(MODAL_SUCCESS, { title: 'Contract verified' }));
				Router.push(SSR_CONTRACT_PATH, URLHelper.createContractUrl(id));

			} catch (err) {
				dispatch(ModalActions.openModal(MODAL_ERROR, { title: FormatHelper.formatServerError(err) }));
			} finally {
				dispatch(FormActions.toggleLoading(FORM_CONTRACT_VERIFY, false));
			}
		};
	}

	/**
	 *
	 * @param contractId
	 * @returns {Function}
	 */
	setStarToContract(contractId) {
		return async (dispatch, getState) => {
			try {
				const isAccessBridge = await dispatch(GlobalActions.checkAccessToBridge());
				if (!isAccessBridge) return;

				const isExistActiveAccount = await dispatch(AccountActions.checkActiveAccount());
				if (!isExistActiveAccount) return;

				const activeAccountId = getState().global.getIn(['activeAccount', 'id']);
				const stars = getState().contract.get('stars');
				const isLike = !stars.includes(activeAccountId);
				const message = ContractHelper.getMessageToLikeContract(isLike, contractId);

				const signature = await BridgeService.proofOfAuthority(message, activeAccountId);

				const { users_has_liked } = await ApiService.setStarToContract({
					signature,
					message,
					contractId,
					accountId: activeAccountId,
				});

				dispatch(this.setValue('stars', fromJS(users_has_liked)));
			} catch (err) {
				const title = typeof err === 'string' ? err : err.message;
				dispatch(ModalActions.openModal(MODAL_ERROR, { title }));
			}
		};
	}


	/**
	 *
	 * @param {string} id
	 * @returns {Function}
	 */
	getContractInfoFromGraphql(id, options = {}) {
		return async (dispatch) => {
			try {
				const contract = await echo.api.getObject(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				const [
					{ history, contractInfo, transferHistory },
					{ total: contractTxs }
				] = await Promise.all([
					getContractInfo({ id, ...options }),
					getTotalHistory([id]),
				]);

				const creationFee = history.items[0].body.fee;
				const feeAsset = await echo.api.getObject(creationFee.asset_id);

				const {
					registrar, block, callers, type, eth_accuracy: ethAccuracy, token,
				} = contractInfo;

				const decimals = new BN((token && token.decimals) || 0).toNumber();

				const tokenTransfers = transferHistory.items.map((transfer) =>
					({ ...transfer, amount: FormatHelper.formatAmount(transfer.amount, decimals) }))

				let { supported_asset_id: supportedAsset } = contractInfo;

				if (supportedAsset !== null) {
					supportedAsset = (await echo.api.getObject(supportedAsset)).symbol;
				}

				dispatch(this.setMultipleValue({
					error: '',
					token,
					countTokenTransfer: transferHistory.total,
					tokenTransfers,
					registrar: registrar.name,
					blockNumber: block.round,
					countUsedByAccount: callers.accounts.length,
					type: fromJS([contract.type, type]),
					supportedAsset,
					ethAccuracy,
					contractTxs,
					creationFee: new Map({
						amount: creationFee.amount,
						precision: feeAsset.precision,
						symbol: feeAsset.symbol,
					}),
					createdAt: block.timestamp,
				}));
				dispatch(GridActions.setTotalDataSize(ERC20_GRID, transferHistory.total));

			} catch (err) {
				dispatch(this.setValue('error', FormatHelper.formatError(err)));
			}
		};
	}


	/**
	 *
	 * @param data
	 * @returns {Function}
	 */
	updateContractHistory(data) {
		return async (dispatch, getState) => {
			const { callers } = data;
			const contractTxs = getState().contract.get('contractTxs');
			dispatch(this.setMultipleValue({
				contractTxs: contractTxs + 1,
				countUsedByAccount: callers.accounts.length,
			}));
		}
	}
}

export default new ContractActions(ContractReducer);
