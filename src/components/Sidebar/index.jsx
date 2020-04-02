import React from 'react';
import SidebarElement from './SidebarElement';
import TotalSupply from './TotalSupply';
import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';

const Sidebar = React.memo(() => (
	<div className="sidebar">
		<SidebarElement title="Total supply">
			<TotalSupply />
		</SidebarElement>
		<SidebarElement title="Blockchain rates">
			<BlockchainRates />
		</SidebarElement>
		<SidebarElement title="Frozen Funds">
			<FrozenFunds />
		</SidebarElement>
	</div>
));

export default Sidebar;
