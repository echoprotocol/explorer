import React, { memo } from 'react';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

const TranfersThead = ({ type }) => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			<td className="account"><div className="td-in">Members account</div></td>
			{type === COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS && <td className="participation"><div className="td-in">Participation</div></td>}
			<td className="bitcoin-address"><div className="td-in">Bitcoin address</div></td>
			<td className="etherium-address"><div className="td-in">Etherium address</div></td>
			<td className="id"><div className="td-in">id</div></td>
			{type === COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS && <td className="last-operation"><div className="td-in">last operation</div></td>}
		</tr>
	</thead>
);


export default memo(TranfersThead);
