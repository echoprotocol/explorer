import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { disconnect } from '../actions/SocketActions';

import GlobalActions from '../actions/GlobalActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';

import ErrorScreen from '../components/ErrorScreen';

import InternetPopup from '../components/InternetPopup';
import NotFound from '../containers/NotFound';
import Modal from '../containers/Modals';
import Loader from '../components/Loader';

import { CONTRACT_DETAILS_NUMBERS_TAB } from '../constants/RouterConstants';
import { MODAL_EXTENSION_INFO, MODAL_ERROR, MODAL_SUCCESS } from '../constants/ModalConstants';


class App extends React.Component {

	componentDidMount() {
		this.props.init();

		document.title = this.props.title;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.children !== this.props.children && this.props.errorPath) {
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

	renderApp(children, { subscribeConnect, showInternetConnectionBar }, pathName, isShowModal) {
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
							{children}
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
			<NotFound />
		);
	}

	render() {
		const {
			children,
			error,
			errorPath,
			connected,
			pathName,
			subscribeConnect,
			showInternetConnectionBar,
			isShowModal,
		} = this.props;


		if (!connected && error) {
			return this.renderErrorScreen(error);
		}

		if (!connected) {
			return <Loader global />;
		}

		if (errorPath) {
			return this.renderNotFound();
		}

		return this.renderApp(children, { subscribeConnect, showInternetConnectionBar }, pathName, isShowModal);

	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
	disconnect: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	init: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	errorPath: PropTypes.bool.isRequired,
	pathName: PropTypes.string.isRequired,
	connected: PropTypes.bool.isRequired,
	subscribeConnect: PropTypes.bool.isRequired,
	showInternetConnectionBar: PropTypes.bool.isRequired,
	isShowModal: PropTypes.bool.isRequired,
	resetErrorPath: PropTypes.func.isRequired,
};

export default connect(
	(state) => ({
		isShowModal: state.modal.get(MODAL_ERROR).get('show') || state.modal.get(MODAL_SUCCESS).get('show') || state.modal.get(MODAL_EXTENSION_INFO).get('show'),
		error: state.global.get('error'),
		errorPath: state.global.get('errorPath'),
		connected: state.global.get('connected'),
		title: state.global.get('title'),
		pathName: state.router.location.pathname,
		subscribeConnect: state.internetPopup.get('connect'),
		showInternetConnectionBar: state.internetPopup.get('show'),
	}),
	(dispatch) => ({
		init: () => dispatch(GlobalActions.init()),
		resetErrorPath: () => dispatch(GlobalActions.toggleErrorPath(false)),
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
