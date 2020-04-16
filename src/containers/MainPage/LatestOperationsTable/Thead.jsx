import React, { memo } from 'react';

const ResentBlocksThead = memo(() => (
	<thead>
		<tr>
			<td className="operation"><div className="td-in">Operation</div></td>
			<td className="from"><div className="td-in">From</div></td>
			<td className="to"><div className="td-in">To</div></td>
			<td className="amount"><div className="td-in">Amount</div></td>
		</tr>
	</thead>
));

export default ResentBlocksThead;
