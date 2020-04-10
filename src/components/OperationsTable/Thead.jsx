import React, { memo } from 'react';

const OperationsThead = memo(() => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			<td className="type"><div className="td-in">Operation</div></td>
			<td className="sender"><div className="td-in">From</div></td>
			<td className="reciever"><div className="td-in">To</div></td>
			<td className="amount"><div className="td-in">Amount</div></td>
			<td className="fee"><div className="td-in">Fee</div></td>
		</tr>
	</thead>
));


export default OperationsThead;
