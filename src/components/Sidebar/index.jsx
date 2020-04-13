import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';

import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';
import Footer from '../../containers/Footer';
import TotalSupply from '../../containers/Sidebar/TotalSupply';


const Sidebar = React.memo(({
	pinned, withFooter, delegationRate, delegationRates, decentralizationRate, decentralizationRates,
}) => (
	<div className={cn('sidebar', { pinned })}>
		<SidebarElement title="Total supply">
			<TotalSupply />
		</SidebarElement>
		<SidebarElement title="Blockchain rates">
			<BlockchainRates
				pinned={pinned}
				delegationRate={delegationRate}
				delegationRates={delegationRates}
				decentralizationRate={decentralizationRate}
				decentralizationRates={decentralizationRates}
			/>
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
	delegationRate: PropTypes.number.isRequired,
	decentralizationRate: PropTypes.number.isRequired,
	delegationRates: PropTypes.array.isRequired,
	decentralizationRates: PropTypes.array.isRequired,
};
Sidebar.defaultProps = {
	pinned: false,
	withFooter: false,
};

export default Sidebar;
