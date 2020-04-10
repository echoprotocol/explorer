import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SidebarElement from './SidebarElement';
import TotalSupply from './TotalSupply';
import BlockchainRates from './BlockchainRates';
import FrozenFunds from './FrozenFunds';
import Footer from '../../containers/Footer';
import { subscribeNewBlock } from '../../services/subscriptions/block';


const Sidebar = React.memo((props) => {
	const {
		pinned,
		withFooter,
		currentFrozenData,
		frozenData,
	} = props;
	const [blockSubscriber, setBlockSubscriber] = useState(null);
	useEffect(() => {
		const subscribe = async () => {
			const newBlock = await subscribeNewBlock();
			const nextUpdate = ({ data: { newBlock: block } }) => props.updateFrozenBalances(block);

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
	updateFrozenBalances: PropTypes.func.isRequired,
};
Sidebar.defaultProps = {
	pinned: false,
	withFooter: false,
};

export default Sidebar;
