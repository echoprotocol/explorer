import React, { memo } from 'react';
import PropTypes from 'prop-types';

const OperationsThead = memo(({ isTransaction }) => (
	<thead>
		<tr>
			<td />
			<td className="number"><div className="td-in">#</div></td>
			<td className="type"><div className="td-in">Operation</div></td>
			<td className="date"><div className="td-in">Date, Time</div></td>
			<td className="sender"><div className="td-in">Sender</div></td>
			<td className="reciever"><div className="td-in">Receiver</div></td>
			<td className="amount"><div className="td-in">Amount</div></td>
			<td className="fee"><div className="td-in">Fee</div></td>
			{isTransaction && <td />}
			<td />
		</tr>
	</thead>
));


OperationsThead.propTypes = {
	isTransaction: PropTypes.bool,
};
OperationsThead.defaultProps = {
	isTransaction: false,
};

export default OperationsThead;
