import React, { memo } from 'react';

const TranfersThead = () => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			<td className="operation"><div className="td-in">Operation</div></td>
			<td className="from"><div className="td-in">From</div></td>
			<td className="to"><div className="td-in">To</div></td>
			<td className="amount"><div className="td-in">Amount</div></td>
			<td className="fee"><div className="td-in">Fee</div></td>
		</tr>
	</thead>
);


export default memo(TranfersThead);
