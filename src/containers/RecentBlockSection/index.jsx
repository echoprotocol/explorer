import React from 'react';
import { Route, Switch } from 'react-router';

// import RecentBlockTable from './RecentBlockTable';
import BlockInformation from './BlockInformation';
import RecentBlockSidebar from './RecentBlockSidebar';
import AccountPage from './AccountPage';


import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
} from '../../constants/RouterConstants';


class RecentBlockSection extends React.Component {

	render() {
		return (
			<div className="recent-block-section">
				<div className="wrap">
					<Switch>
						<Route exact path={INDEX_PATH} component={AccountPage} />
						<Route exact path={BLOCK_INFORMATION_PATH} component={BlockInformation} />
					</Switch>
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

export default RecentBlockSection;
