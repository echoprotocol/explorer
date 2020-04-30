import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { disconnect } from '../actions/SocketActions';

import GlobalActions from '../actions/GlobalActions';

import Toast from '../components/Toast';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import InternetPopup from '../components/InternetPopup';
import NotFoundScreen from '../components/Error/NotFoundScreen';
import ErrorScreen from '../components/Error/ErrorScreen';
import Modal from '../containers/Modals';
import Loader from '../components/Loader';

import { CONTRACT_DETAILS_NUMBERS_TAB, ROUTES_WITH_COLUMN_DIRECTION } from '../constants/RouterConstants';
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

	renderModals(isShowModal) {
		return (
			<div className={cn({ 'wrapper-min': isShowModal })}>
				<Modal />
			</div>
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
				<Header />
				{ ROUTES_WITH_COLUMN_DIRECTION.includes(pathName) ?
					<React.Fragment>
						<div className="wrap">
							<Sidebar />
						</div>
						{children}
						<Footer />
					</React.Fragment> :
					<React.Fragment>
						<div className={cn('wrap', 'flex', { full })}>
							{children}
							<Sidebar pinned withFooter />
						</div>
						<Footer />
					</React.Fragment>
				}
				{this.renderModals(isShowModal)}
				{ showInternetConnectionBar && <InternetPopup isConnected={subscribeConnect} /> }
				<Toast />

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
			children,
			error,
			errorPath,
			errorScreen,
			connected,
			pathName,
			subscribeConnect,
			showInternetConnectionBar,
			isShowModal,
		} = this.props;

		if ((!connected && error) || errorScreen) {
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
	errorScreen: PropTypes.bool.isRequired,
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
		errorScreen: state.global.get('errorScreen'),
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
