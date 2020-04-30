import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';

import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';
import Footer from '../../containers/Footer';
import { subscribeNewBlock } from '../../services/subscriptions/block';
import TotalSupply from '../../containers/Sidebar/TotalSupply';

const Sidebar = React.memo((props) => {
	const {
		pinned,
		withFooter,
		currentFrozenData,
		frozenData,
		delegationRate,
		delegationRates,
		decentralizationRate,
		decentralizationRates,
	} = props;
	const [blockSubscriber, setBlockSubscriber] = useState(null);
	useEffect(() => {
		const subscribe = async () => {
			const newBlock = await subscribeNewBlock();
			const nextUpdate = ({ data: { newBlock: block } }) => props.updateStatistics(block);

			setBlockSubscriber(newBlock.subscribe({
				next: nextUpdate.bind(this),
				error: (err) => { console.log('Handle block error: ', err.message || err); },
			}));
		};

		if (!blockSubscriber) {
			subscribe();
		}

		return () => {
			if (blockSubscriber) {
				setBlockSubscriber(null);
				blockSubscriber.unsubscribe();
			}
		};
	});
	return (
		<div className={cn('sidebar', { pinned })}>
			<SidebarElement title="Total supply" className="total-supply">
				<TotalSupply />
			</SidebarElement>
			<SidebarElement title="Blockchain rates" className="blockchain-rates">
				<BlockchainRates
					pinned={pinned}
					delegationRate={delegationRate}
					delegationRates={delegationRates}
					decentralizationRate={decentralizationRate}
					decentralizationRates={decentralizationRates}
				/>
			</SidebarElement>
			<SidebarElement title="Frozen Funds" className="frozen-funds">
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
	updateStatistics: PropTypes.func.isRequired,
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
