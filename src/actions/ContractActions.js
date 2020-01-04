import echo, { OPERATIONS_IDS, validators } from 'echojs-lib';
import { List, fromJS, Map } from 'immutable';
import { batchActions } from 'redux-batched-actions';
import * as wrapper from 'solc/wrapper';

import {
	CONTRACT_FIELDS,
	DEFAULT_OPERATION_HISTORY_ID,
	DEFAULT_ROWS_COUNT,
	MIN_ACCESS_VERSION_BUILD,
} from '../constants/GlobalConstants';
import { OPERATION_HISTORY_OBJECT_PREFIX } from '../constants/ObjectPrefixesConstants';
import { MODAL_ERROR, MODAL_SUCCESS, MODAL_EXTENSION_INFO } from '../constants/ModalConstants';
import { FORM_CONTRACT_VERIFY, FORM_MANAGE_CONTRACT } from '../constants/FormConstants';
import { CONTRACT_ABI } from '../constants/RouterConstants';

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
import browserHistory from '../history';

class ContractActions extends BaseActionsClass {

	/**
	 * Format contract history
	 * @param {Array} transactions
	 * @returns {function}
	 */
	async formatContractHistory(transactions) {
		await TransactionActions.fetchTransactionsObjects(transactions);

		let history = transactions.map(async (t) => {
			let { op: operation, result } = t;

			const block = await echo.api.getBlock(t.block_num);

			if (OPERATIONS_IDS.CONTRACT_TRANSFER === t.op[0]) {

				operation = block.transactions[t.trx_in_block].operations[t.op_in_trx];
				result = block.transactions[t.trx_in_block].operation_results[t.op_in_trx];
			}

			return TransactionActions.getOperation(operation, t.block_num, block.timestamp, t.trx_in_block, t.op_in_trx, result);
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

			if (!validators.isContractId(id)) {
				dispatch(GlobalActions.toggleErrorPath(true));
				return;
			}

			dispatch(this.setValue('loading', true));
			try {
				const contract = await echo.api.getContract(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				await dispatch(this.getContractInfoFromExplorer(id));
				await dispatch(this.getContractInfoFromGraphql(id));

				const balances = await echo.api.getContractBalances(id);
				await echo.api.getObjects(balances.map((b) => b.asset_id));

				let { owner } = await echo.api.getObject(id);
				owner = new Map(await echo.api.getObject(owner));


				dispatch(this.setMultipleValue({
					bytecode: contract[1].code,
					balances: fromJS(balances),
					owner,
				}));

				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					DEFAULT_OPERATION_HISTORY_ID,
				);

				const isFullHistory = history.length <= DEFAULT_ROWS_COUNT;
				if (history.length > DEFAULT_ROWS_COUNT) {
					history = history.slice(0, history.length - 1);
				}

				history = await this.formatContractHistory(history);

				dispatch(this.setMultipleValue({ history: new List(history), isFullHistory }));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loading', false));
			}
		};
	}

	/**
	 * Load contract history
	 * @param {string} id
	 * @param {number} lastOperationId
	 * @returns {function}
	 */
	loadContractHistory(id, lastOperationId) {
		return async (dispatch, getState) => {
			const lastOperationIdState = getState().contract.get('lastOperationId');

			if (lastOperationIdState === lastOperationId) {
				return;
			}

			try {
				dispatch(this.setValue('lastOperationId', lastOperationId));
				dispatch(this.setValue('loadingMoreHistory', true));

				let history = await echo.api.getContractHistory(
					id,
					DEFAULT_OPERATION_HISTORY_ID,
					DEFAULT_ROWS_COUNT + 1,
					`${OPERATION_HISTORY_OBJECT_PREFIX}.${lastOperationId - 1}`,
				);

				history = await this.formatContractHistory(history.slice(0, DEFAULT_ROWS_COUNT));

				dispatch(batchActions([
					this.reducer.actions.concat({ field: 'history', value: new List(history) }),
					this.reducer.actions.set({
						field: 'isFullHistory',
						value: history.length < DEFAULT_ROWS_COUNT,
					}),
				]));
			} catch (e) {
				dispatch(this.setValue('error', e.message));
			} finally {
				dispatch(this.setValue('loadingMoreHistory', false));
			}
		};
	}

	/**
	 * Update contract info
	 * @param {string} id
	 * @param {number} recentOperationId
	 * @returns {function}
	 */
	updateContractInfo(id, recentOperationId = DEFAULT_OPERATION_HISTORY_ID) {
		const getHistory = async (history = []) => {

			const chunk = await echo.api.getContractHistory(
				id,
				history.length ? [history.length - 1].id : recentOperationId,
				DEFAULT_ROWS_COUNT + 1,
				DEFAULT_OPERATION_HISTORY_ID,
			);

			history = history.concat(chunk);

			if (chunk.length > DEFAULT_ROWS_COUNT) {
				return getHistory(history);
			}

			return history;
		};

		return async (dispatch) => {
			try {
				let balances = await echo.api.getContractBalances(id);
				await echo.api.getObjects(balances.map((b) => b.asset_id));
				balances = fromJS(balances);

				let history = await getHistory();
				history = await this.formatContractHistory(history);
				history = new List(history);

				dispatch(batchActions([
					this.reducer.actions.update({ field: 'history', value: history }),
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
			await loadScript(`${__SOLC_BIN_URL__}${solcLatestRelease}`); // eslint-disable-line no-undef
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
				const response = await fetch(`${__SOLC_BIN_URL__}${compilerBuild.get('path')}`);
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

	contractCodeCompile(code, filename = 'test.sol') {
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
				dispatch(FormActions.setFormError(FORM_CONTRACT_VERIFY, 'currentCompiler', 'Invalid contract code'));
				dispatch(this.setValue('contracts', new Map({})));
				dispatch(FormActions.setValue(FORM_CONTRACT_VERIFY, 'contractName', ''));
			}
		};
	}

	manageContract(contractId, name, icon, description, clickSaveCounter) {
		return async (dispatch, getState) => {

			if (!BridgeService.isExist()) {
				dispatch(ModalActions.openModal(MODAL_EXTENSION_INFO, {}));
				return;
			}

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
				browserHistory.push(URLHelper.createContractUrl(id, CONTRACT_ABI));
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
				browserHistory.push(URLHelper.createContractUrl(id));

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

				const isExistActiveAcount = await dispatch(AccountActions.checkActiveAccount());
				if (!isExistActiveAcount) return;

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
	getContractInfoFromGraphql(id) {
		return async (dispatch) => {
			try {
				const contract = await echo.api.getObject(id);

				if (!contract) {
					dispatch(GlobalActions.toggleErrorPath(true));
					return;
				}

				let { history, contractInfo } = await getContractInfo(id);
				const contractTxs = (await getTotalHistory([id])).total;

				const creationFee = history.items[0].body.fee;
				const feeAsset = await echo.api.getObject(creationFee.asset_id);

				const {
					registrar, block, callers, type, eth_accuracy: ethAccuracy,
				} = contractInfo;

				let { supported_asset_id: supportedAsset } = contractInfo;

				if (supportedAsset !== null) {
					supportedAsset = (await echo.api.getObject(supportedAsset)).symbol;
				}

				dispatch(this.setMultipleValue({
					error: '',
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
