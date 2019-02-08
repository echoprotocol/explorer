import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import App from './containers/App';
import RecentBlockSection from './containers/RecentBlockSection';
import Objects from './containers/Objects';
import Account from './containers/Account';
import Asset from './containers/Asset';
import Contract from './containers/Contract';
import NotFound from './containers/NotFound';

import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
	TRANSACTION_INFORMATION_PATH,
	OBJECTS_PATH,
	ACCOUNTS_PATH,
	ASSET_PATH,
	CONTRACT_PATH,
	NOT_FOUND_PATH,
} from './constants/RouterConstants';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route exact path={INDEX_PATH} component={RecentBlockSection} />
					<Route exact path={BLOCK_INFORMATION_PATH} component={RecentBlockSection} />
					<Route exact path={TRANSACTION_INFORMATION_PATH} component={RecentBlockSection} />
					<Route exact path={OBJECTS_PATH} component={Objects} />
					<Route exact path={ACCOUNTS_PATH} component={Account} />
					<Route exact path={ASSET_PATH} component={Asset} />
					<Route exact path={CONTRACT_PATH} component={Contract} />
					<Route exact path={NOT_FOUND_PATH} component={NotFound} />
					<Redirect to={NOT_FOUND_PATH} />
				</Switch>
			</App>
		);
	}

}
