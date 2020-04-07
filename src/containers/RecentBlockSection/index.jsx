import React from 'react';
import { Route, Switch } from 'react-router';

import MainPage from '../MainPage';
import BlockInformation from './BlockInformation';
import TransactionsInfo from './TransactionsInfo';

import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
	TRANSACTION_INFORMATION_PATH,
} from '../../constants/RouterConstants';


class RecentBlockSection extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path={INDEX_PATH} component={MainPage} />
				<Route exact path={BLOCK_INFORMATION_PATH} component={BlockInformation} />
				<Route exact path={TRANSACTION_INFORMATION_PATH} component={TransactionsInfo} />
			</Switch>
		);
	}

}

export default RecentBlockSection;
