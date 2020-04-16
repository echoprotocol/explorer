import React, { memo } from 'react';

const ResentBlocksThead = memo(() => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			<td className="age"><div className="td-in">Age</div></td>
			<td className="producer"><div className="td-in">Producer</div></td>
			<td className="size"><div className="td-in">Size</div></td>
			<td className="txs"><div className="td-in">Txs</div></td>
		</tr>
	</thead>
));

export default ResentBlocksThead;
