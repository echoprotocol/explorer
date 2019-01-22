import React from 'react';
import { Route, Switch } from 'react-router';

// import RecentBlockTable from './RecentBlockTable';
import BlockInformation from './BlockInformation';
import RecentBlockSidebar from './RecentBlockSidebar';
import TransactionsInfo from './TransactionsInfo';

import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
	TRANSACTION_PATH,
} from '../../constants/RouterConstants';


class RecentBlockSection extends React.Component {

	render() {
		return (
			<div className="recent-block-section">
				<div className="wrap">
					<Switch>
						<Route exact path={INDEX_PATH} component={TransactionsInfo} />
						<Route exact path={BLOCK_INFORMATION_PATH} component={BlockInformation} />
						<Route exact path={TRANSACTION_PATH} component={TransactionsInfo} />
					</Switch>
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

export default RecentBlockSection;
