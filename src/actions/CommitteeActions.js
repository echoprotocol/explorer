import { List } from 'immutable';

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

			return {
				account: {
					link: data.id,
					value: data.name,
				},
				id: data.committee_options.committee_member_id,
				bitcoinHash: data.committee_options.btc_public_key,
				etheriumHash: data.committee_options.eth_address,
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

	loadCommittees(status) {
		return async (dispatch, getState) => {
			let total = 0;
			let items = [];
			try {
				// dispatch(this.setValue('loadingMoreCommittee', true));
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
				const committeeAccounts = this.formatCommitteeAccounts(items);
				// committeeAccounts = await this.addAditinalInfo(committeeAccounts);
				dispatch(this.setValue(listKey, new List(committeeAccounts)));
				return { total, items };
			} catch (e) {
				dispatch(this.setValue('error', e.message));
				return { total, items };
			} finally {
				// dispatch(this.setValue('loadingMoreCommittee', false));
			}
		};
	}

}

export default new CommitteeActions();
