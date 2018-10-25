import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Index from './containers/Index';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<Switch>
					<Route path="/" component={Index} />
				</Switch>
			</App>
		);
	}

}
