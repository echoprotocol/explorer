import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disconnect } from '../actions/SocketActions';

import GlobalActions from '../actions/GlobalActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';

import ErrorScreen from '../components/ErrorScreen';


class App extends React.Component {

	componentDidMount() {
		this.props.init();
	}

	componentWillUnmount() {
		this.props.disconnect();
	}

	renderModals() {
		return (
			<div />
		);
	}

	renderErrorScreen(error) {
		return (
			<ErrorScreen error={error} />
		);
	}

	renderApp(children) {
		return (
			<div className="wrapper">
				<Header />
				<div className="recent-block-section">
					<div className="wrap">
						{children}
						<RecentBlockSidebar />
					</div>
				</div>
				{this.renderModals()}
				<Toast />
			</div>
		);
	}

	render() {
		const { children, error, connected } = this.props;
		return !connected && error ? this.renderErrorScreen(error) : this.renderApp(children);
	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
	disconnect: PropTypes.func.isRequired,
	init: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	connected: PropTypes.bool.isRequired,
};

export default connect(
	(state) => ({
		error: state.global.get('error'),
		connected: state.global.get('connected'),
	}),
	(dispatch) => ({
		init: () => dispatch(GlobalActions.init()),
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
