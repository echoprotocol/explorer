import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';

import { disconnect } from '../actions/SocketActions';

import GlobalActions from '../actions/GlobalActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';

import InternetPopup from '../components/InternetPopup';
import NotFoundScreen from '../containers/Error/NotFoundScreen';
import ErrorScreen from '../components/Error/ErrorScreen';
import Modal from '../containers/Modals';

import { CONTRACT_DETAILS_NUMBERS_TAB } from '../constants/RouterConstants';
import { MODAL_EXTENSION_INFO, MODAL_ERROR, MODAL_SUCCESS } from '../constants/ModalConstants';


class App extends React.Component {

	componentDidMount() {
		this.props.init();
		document.title = this.props.title;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.title !== this.props.title && this.props.errorPath) {
			this.props.resetErrorPath();
		}

		if (prevProps.title !== this.props.title) {
			document.title = this.props.title;
		}
	}

	componentWillUnmount() {
		this.props.disconnect();
	}

	renderModals() {
		return (
			<Modal />
		);
	}

	renderErrorScreen(error) {
		return (
			<ErrorScreen error={error} />
		);
	}

	renderApp({ subscribeConnect, showInternetConnectionBar }, pathName, isShowModal) {
		const parsedLocation = pathName.split('/')[1];
		const full = Object.keys(CONTRACT_DETAILS_NUMBERS_TAB).includes(parsedLocation);

		return (
			<React.Fragment>
				{this.renderModals()}
				<div className={classnames('wrapper', { 'wrapper-min': isShowModal })}>
					<Header />
					<div className="recent-block-section">
						<div
							className={classnames('wrap', { full })}
						>
							{renderRoutes(this.props.route.routes)}
							<RecentBlockSidebar />
						</div>
					</div>

					<Toast />
					{
						showInternetConnectionBar && <InternetPopup isConnected={subscribeConnect} />
					}
				</div>
			</React.Fragment>
		);
	}

	renderNotFound() {
		return (
			<NotFoundScreen />
		);
	}

	render() {
		const {
			error,
			errorPath,
			errorScreen,
			connected,
			pathname,
			subscribeConnect,
			showInternetConnectionBar,
			isShowModal,
		} = this.props;

		if ((!connected && error) || errorScreen) {
			return this.renderErrorScreen(error);
		}

		console.log('APP render connected', connected);

		// if (!connected) {
		// 	return <Loader />;
		// }

		if (errorPath) {
			return this.renderNotFound();
		}

		return this.renderApp({ subscribeConnect, showInternetConnectionBar }, pathname, isShowModal);

	}

}

App.propTypes = {
	disconnect: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	init: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	errorPath: PropTypes.bool.isRequired,
	errorScreen: PropTypes.bool.isRequired,
	pathname: PropTypes.string.isRequired,
	connected: PropTypes.bool.isRequired,
	subscribeConnect: PropTypes.bool.isRequired,
	showInternetConnectionBar: PropTypes.bool.isRequired,
	isShowModal: PropTypes.bool.isRequired,
	route: PropTypes.objectOf(PropTypes.any),
	resetErrorPath: PropTypes.func.isRequired,
};

App.defaultProps = {
	route: null,
};

export const loadData = (store) => store.dispatch(GlobalActions.init());

export default withRouter(connect(
	(state, props) => ({
		isShowModal: state.modal.get(MODAL_ERROR).get('show') || state.modal.get(MODAL_SUCCESS).get('show') || state.modal.get(MODAL_EXTENSION_INFO).get('show'),
		error: state.global.get('error'),
		errorPath: state.global.get('errorPath'),
		errorScreen: state.global.get('errorScreen'),
		connected: state.global.get('connected'),
		title: state.global.get('title'),
		subscribeConnect: state.internetPopup.get('connect'),
		showInternetConnectionBar: state.internetPopup.get('show'),
		pathname: props.location.pathname,
	}),
	(dispatch) => ({
		init: () => dispatch(GlobalActions.init()),
		resetErrorPath: () => dispatch(GlobalActions.toggleErrorPath(false)),
		disconnect: () => dispatch(disconnect()),
	}),
)(App));
