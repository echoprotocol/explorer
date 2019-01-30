import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disconnect } from '../actions/SocketActions';

import GlobalActions from '../actions/GlobalActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';

import ErrorScreen from '../components/ErrorScreen';
import Loader from '../components/Loader';

class App extends React.Component {

	componentDidMount() {
		this.props.init();

		document.title = this.props.title;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.title !== this.props.title) {
			document.title = this.props.title;
		}
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

		if (!connected) {
			return error ? this.renderErrorScreen(error) : (
				<div className="f-h-loader-wrapper">
					<Loader text="Loading..." />
				</div>
			);
		}

		return this.renderApp(children);
	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
	disconnect: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	init: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	connected: PropTypes.bool.isRequired,
};

export default connect(
	(state) => ({
		error: state.global.get('error'),
		connected: state.global.get('connected'),
		title: state.global.get('title'),
	}),
	(dispatch) => ({
		init: () => dispatch(GlobalActions.init()),
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
