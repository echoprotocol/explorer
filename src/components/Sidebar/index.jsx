import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';
import TotalSupply from './TotalSupply';
import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';
import Footer from '../../containers/Footer';


const Sidebar = React.memo(({ pinned, withFooter }) => (
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
		{withFooter && <Footer />}
	</div>
));

Sidebar.propTypes = {
	pinned: PropTypes.bool,
	withFooter: PropTypes.bool,
};
Sidebar.defaultProps = {
	pinned: false,
	withFooter: false,
};

export default Sidebar;
