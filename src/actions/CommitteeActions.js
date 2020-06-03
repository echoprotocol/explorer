import { List } from 'immutable';
import echo from 'echojs-lib';

import GridActions from './GridActions';

import CommitteeReducer from '../reducers/CommitteeReducer';
import BaseActionsClass from './BaseActionsClass';

import { getCommitteAccounts } from '../services/queries/account';

import {
	CURRENT_COMMITTEE_GRID,
	CANDIDATE_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../constants/TableConstants';
import { ECHODB_COMMITTEE_STATUS } from '../constants/CommitteeConstants';
import Operations from '../constants/Operations';
import { ECHO_ASSET, EBTC_ASSET_ID, EETH_ASSET_ID } from '../constants/GlobalConstants';
import FormatHelper from '../helpers/FormatHelper';
import { getBtcAddressByPublicKey } from '../services/transform.ops/AddInfoHelper';


class CommitteeActions extends BaseActionsClass {

	/** Set reducer
	 * @constructor
	 */
	constructor() {
		super(CommitteeReducer);
	}

	formatCommitteeAccounts(committees) {
		const operationValues = Object.values(Operations);

		return committees.map((data) => {
			const operationId = data.committee_options.last_executed_operation_id;
			const operationInfo = operationValues.find((op) => op.value === operationId);

			const opType = (operationInfo && operationInfo.name) || 'operation';
			const btcAddress = getBtcAddressByPublicKey(data.committee_options.btc_public_key);

			return {
				account: {
					link: data.id,
					value: data.name,
				},
				id: data.committee_options.committee_member_id,
				bitcoinHash: btcAddress,
				etheriumHash: FormatHelper.addEthPrefix(data.committee_options.eth_address),
				participation: data.committee_options.last_status_change_time,
				abandon: data.committee_options.last_status_change_time,
				lastOperation: {
					type: opType,
					link: data.committee_options.last_executed_operation,
				},
				proposalTransaction: data.committee_options.proposal_operation,
				confirmations: data.committee_options.approves_count,
			};
		});
	}

	/**
	* Format account history
	* @param {String} accountId
	* @returns {Promise<Object>}
	*/
	async getCommitteAdditionalInfo(accountId) {
		const assetsIds = [
			ECHO_ASSET.ID,
			EETH_ASSET_ID,
			EBTC_ASSET_ID,
		];
		const [committeBalances, assetsData, committeMember] = await Promise.all([
			echo.api.getAccountBalances(accountId, assetsIds),
			echo.api.getAssets(assetsIds),
			echo.api.getCommitteeMemberByAccount(accountId),
		]);
		let committeeFrozenData = {};
		if (committeMember) {
			committeeFrozenData = await echo.api.getCommitteeFrozenBalance(committeMember.id);
		}
		const assets = assetsData.map((el) => ({
			amount: committeBalances.find((b) => b.asset_id === el.id).amount,
			asset_id: el.id,
			precision: el.precision,
			symbol: el.symbol,
		}));
		const website = committeMember && committeMember.url;
		const frozenBalanceAmount = committeeFrozenData.amount || 0;
		const frozenBalance = {
			amount: frozenBalanceAmount,
			asset_id: ECHO_ASSET.ID,
			precision: ECHO_ASSET.PRECISION,
			symbol: ECHO_ASSET.SYMBOL,
		};
		return { assets, frozenBalance, website };
	}

	addAditinalInfo(committeeData) {
		return committeeData.map(async (data) => {
			try {
				const aditionalData = await this.getCommitteAdditionalInfo(data.account.link);
				data.additionalInfo = aditionalData;
				return data;
			} catch (e) {
				console.log('Get additional committee data error', e);
				return data;
			}
		});
	}

	loadCommittees(status) {
		return async (dispatch, getState) => {
			let total = 0;
			let items = [];
			try {
				if (!echo.api) return {};
				dispatch(this.setValue('loadingMoreCommittee', true));

				const getGreedAndListKEy = (echodbStatus) => {
					switch (echodbStatus) {
						case ECHODB_COMMITTEE_STATUS.ACTIVE:
							return { grid: CURRENT_COMMITTEE_GRID, listKey: 'currentCommittee' };
						case ECHODB_COMMITTEE_STATUS.CANDIDATE:
							return { grid: CANDIDATE_COMMITTEE_GRID, listKey: 'candidateCommittee' };
						case ECHODB_COMMITTEE_STATUS.DEACTIVATED:
							return { grid: DEACTIVATED_COMMITTEE_GRID, listKey: 'deactivatedCommittee' };
						default:
							return { grid: CURRENT_COMMITTEE_GRID, listKey: 'currentCommittee' };
					}
				};

				const { grid, listKey } = getGreedAndListKEy(status);
				const queryData = getState().grid.get(grid).toJS();

				try {
					({ items, total } = await getCommitteAccounts({
						status,
						offset: (queryData.currentPage - 1) * queryData.sizePerPage,
						count: queryData.sizePerPage,
					}));
				} catch (err) {
					console.log('EchoDB getCommitteAccounts error', err);
				}

				dispatch(GridActions.setTotalDataSize(grid, total));
				let committeeAccounts = this.formatCommitteeAccounts(items);
				committeeAccounts = await Promise.all(this.addAditinalInfo(committeeAccounts));
				dispatch(this.setValue(listKey, new List(committeeAccounts)));
				return { total, items };
			} catch (e) {
				dispatch(this.setValue('error', e.message));
				return { total, items };
			} finally {
				dispatch(this.setValue('loadingMoreCommittee', false));
			}
		};
	}

}

export default new CommitteeActions();
