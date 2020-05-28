import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

const TranfersThead = ({ type }) => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			{type === DEACTIVATED_COMMITTEE_GRID && <td className="abandon"><div className="td-in">Abandon</div></td>}
			<td className="account"><div className="td-in">Member account</div></td>
			{type === CURRENT_COMMITTEE_GRID && <td className="participation"><div className="td-in">Participation</div></td>}
			{type === CANDIDATE_COMMITTEE_GRID && <td className="confirmations"><div className="td-in">Confirmations</div></td>}
			<td className="bitcoin-address"><div className="td-in">Bitcoin address</div></td>
			<td className="etherium-address"><div className="td-in">Etherium address</div></td>
			<td className="id"><div className="td-in">id</div></td>
			{type === CURRENT_COMMITTEE_GRID && <td className="last-operation"><div className="td-in">last operation</div></td>}
			{(type === CANDIDATE_COMMITTEE_GRID || type === DEACTIVATED_COMMITTEE_GRID) &&
			<td className="proposal-transaction"><div className="td-in">Proposal transaction</div></td>}
		</tr>
	</thead>
);

TranfersThead.propTypes = {
	type: PropTypes
		.oneOf([CURRENT_COMMITTEE_GRID, CANDIDATE_COMMITTEE_GRID, DEACTIVATED_COMMITTEE_GRID])
		.isRequired,
};

export default memo(TranfersThead);
