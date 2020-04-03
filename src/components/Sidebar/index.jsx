import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';
import TotalSupply from './TotalSupply';
import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';

const Sidebar = React.memo(({ pinned }) => (
	<div className={cn('sidebar', { pinned })}>
		<SidebarElement title="Total supply">
			<TotalSupply />
		</SidebarElement>
		<SidebarElement title="Blockchain rates">
			<BlockchainRates pinned={pinned} />
		</SidebarElement>
		<SidebarElement title="Frozen Funds">
			<FrozenFunds />
		</SidebarElement>
	</div>
));

Sidebar.propTypes = {
	pinned: PropTypes.bool,
};
Sidebar.defaultProps = {
	pinned: false,
};

export default Sidebar;
