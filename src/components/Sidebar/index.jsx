import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';

import Incentives from './Incentives';
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
		incentivesPool,
		incentive,
		incentiveRates,
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
			<SidebarElement title="Fee Pool" className="fee-pool">
				<Incentives
					pinned={pinned}
					incentivesPool={incentivesPool}
					incentive={incentive}
					incentiveRates={incentiveRates}
					openModal={props.openModal}
				/>
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
	incentivesPool: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	incentive: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	incentiveRates: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired,
};
Sidebar.defaultProps = {
	pinned: false,
	withFooter: false,
};

export default Sidebar;
