import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

const TranfersThead = ({ type }) => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			{type === COMMITTEE_TABLE_TYPE.FORMER_MEMBERS && <td className="abandon"><div className="td-in">Abandon</div></td>}
			<td className="account"><div className="td-in">Member account</div></td>
			{type === COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS && <td className="participation"><div className="td-in">Participation</div></td>}
			{type === COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES && <td className="confirmations"><div className="td-in">Confirmations</div></td>}
			<td className="bitcoin-address"><div className="td-in">Bitcoin address</div></td>
			<td className="etherium-address"><div className="td-in">Etherium address</div></td>
			<td className="id"><div className="td-in">id</div></td>
			{type === COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS && <td className="last-operation"><div className="td-in">last operation</div></td>}
			{(type === COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES || type === COMMITTEE_TABLE_TYPE.FORMER_MEMBERS) &&
			<td className="proposal-transaction"><div className="td-in">Proposal transaction</div></td>}
		</tr>
	</thead>
);

TranfersThead.propTypes = {
	type: PropTypes
		.oneOf([COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS, COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES, COMMITTEE_TABLE_TYPE.FORMER_MEMBERS])
		.isRequired,
};

export default memo(TranfersThead);
