import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import RecentBlockSection from './containers/RecentBlockSection';
import BlockInformation from './containers/RecentBlockSection/BlockInformation';

import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
} from './constants/RouterConstants';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route exact path={INDEX_PATH} component={RecentBlockSection} />
					<Route exact path={BLOCK_INFORMATION_PATH} component={BlockInformation} />
				</Switch>
			</App>
		);
	}

}
