import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';
import TotalSupply from './TotalSupply';
import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';
import Footer from '../../containers/Footer';


const Sidebar = React.memo((props) => {
	const {
		pinned,
		withFooter,
		currentFrozenData,
		frozenData,
	} = props;
	console.log(currentFrozenData, frozenData)
	return (
		<div className={cn('sidebar', { pinned })}>
			<SidebarElement title="Total supply">
				<TotalSupply />
			</SidebarElement>
			<SidebarElement title="Blockchain rates">
				<BlockchainRates pinned={pinned} />
			</SidebarElement>
			<SidebarElement title="Frozen Funds">
				<FrozenFunds
					currentFrozenData={currentFrozenData}
					frozenData={frozenData}
				/>
			</SidebarElement>
			{withFooter && <Footer />}
		</div>
	);
});

Sidebar.propTypes = {
	pinned: PropTypes.bool,
	withFooter: PropTypes.bool,
	currentFrozenData: PropTypes.object.isRequired,
	frozenData: PropTypes.array.isRequired,
};
Sidebar.defaultProps = {
	pinned: false,
	withFooter: false,
};

export default Sidebar;
