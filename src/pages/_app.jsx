import App from 'next/app';
import { withRouter } from 'next/router';
import classnames from 'classnames';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { serialize, deserialize } from 'json-immutable';
import MobileDetect from 'mobile-detect';
import { Helmet } from 'react-helmet';
import React from 'react';
import configureStore from '../store';

import '../public/loader';
import Header from '../containers/Header';
import Modal from '../containers/Modals';

import { CONTRACT_DETAILS_NUMBERS_TAB } from '../constants/RouterConstants';
import Footer from '../containers/Footer';
import RecentBlockSidebar from '../containers/RecentBlockSection/RecentBlockSidebar';
import GlobalActions from '../actions/GlobalActions';
import { disconnect, serverConnect } from '../actions/SocketActions';
import ErrorScreen from '../components/Error/ErrorScreen';
import NotFoundScreen from '../components/Error/NotFoundScreen';
import Toast from '../components/Toast';
import InternetPopup from '../containers/InternetPopup';
import Loader from '../components/Loader';

class ExplorerApp extends App {

	componentDidMount() {
		if (typeof window === 'undefined') { return; }
		this.props.store.dispatch(GlobalActions.init());
	}

	componentWillUnmount() {
		this.props.store.dispatch(disconnect());
	}

	renderModals() {
		return (
			<Modal />
		);
	}

	renderMeta() {
		const title = this.props.store.getState().global.get('title');
		return (
			<Helmet
				htmlAttributes={{ lang: 'en' }}
				title={title || 'Echo Explorer'}
				meta={[
					{
						charset: 'UTF-8',
					},
					{
						name: 'viewport',
						id: 'viewport',
						content: 'width=device-width, initial-scale=1',
					},
					{
						'http-equiv': 'Content-Type',
						content: 'text/html; charset=utf-8',
					},
				]}
			/>
		);
	}

	renderErrorScreen(error) {
		return (
			<ErrorScreen error={error} />
		);
	}

	renderNotFound() {
		const resetErrorPath = () => this.props.store.dispatch(GlobalActions.toggleErrorPath(false));
		return (
			<NotFoundScreen resetErrorPath={() => resetErrorPath()} />
		);
	}

	render() {
		const {
			router: { pathname },
			isShowModal,
			Component, pageProps, store,
		} = this.props;
		const parsedLocation = pathname.split('/')[1];
		const full = Object.keys(CONTRACT_DETAILS_NUMBERS_TAB).includes(parsedLocation);
		const error = store.getState().global.get('error');
		const errorScreen = store.getState().global.get('errorScreen');
		const errorPath = store.getState().global.get('errorPath');
		const clientConnected = store.getState().global.get('connected');
		const connectedServer = store.getState().global.get('connectedServer');

		if (error || errorScreen) {
			return this.renderErrorScreen(error);
		}

		if ((typeof window === 'undefined' && !connectedServer) || (typeof window !== 'undefined' && !clientConnected && !connectedServer)) {
			return <Loader global />;
		}

		if (errorPath) {
			return this.renderNotFound();
		}

		return (
			<Provider store={store}>
				<div>
					{this.renderMeta()}
					{this.renderModals()}
					<div className={classnames('wrapper', { 'wrapper-min': isShowModal })}>
						<Header />
						<div className="recent-block-section">
							<div
								className={classnames('wrap', { full })}
							>
								<Component {...pageProps} />
								<RecentBlockSidebar />
							</div>
						</div>
						<Footer />
						<Toast />
						<InternetPopup />
					</div>
				</div>
			</Provider>
		);
	}

}

ExplorerApp.propTypes = {
	router: PropTypes.object,
	store: PropTypes.object.isRequired,
};

ExplorerApp.defaultProps = {
	router: {},
};

ExplorerApp.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	if (ctx.isServer) {
		const userAgent = ctx.req ? ctx.req.headers['user-agent'] : window.navigator.userAgent;
		const isMobile = !!(new MobileDetect(userAgent)).mobile();

		await ctx.store.dispatch(GlobalActions.setValue('isMobile', isMobile));
		await ctx.store.dispatch(serverConnect());
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

	}
	return { pageProps };
};

const withReduxJob = withRedux(
	(initialState) => configureStore(initialState),
	{
		serializeState: (state = {}) => serialize(state),
		deserializeState: (state = serialize({})) => deserialize(state),
	},
);

export default withRouter(withReduxJob(ExplorerApp));