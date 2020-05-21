import React, { memo } from 'react';
import PropTypes from 'prop-types';

const BlocksThead = ({ isAllBlocks }) => (
	<thead>
		<tr>
			<td className="number"><div className="td-in">#</div></td>
			<td className="age"><div className="td-in">Age</div></td>
			<td className="producer"><div className="td-in">Producer</div></td>
			{isAllBlocks && <td className="reward"><div className="td-in">Reward</div></td>}
			<td className="size"><div className="td-in">Size</div></td>
			<td className="txs"><div className="td-in">Txs</div></td>
		</tr>
	</thead>
);

BlocksThead.propTypes = {
	isAllBlocks: PropTypes.bool,
};

BlocksThead.defaultProps = {
	isAllBlocks: false,
};

export default memo(BlocksThead);
