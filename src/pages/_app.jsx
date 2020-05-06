import App from 'next/app';
import Router, { withRouter } from 'next/router';
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

import { CONTRACT_DETAILS_NUMBERS_TAB, SSR_TRANSACTION_INFORMATION_PATH, ROUTES_WITH_COLUMN_DIRECTION } from '../constants/RouterConstants';
import { TESTNET_MODE } from '../constants/GlobalConstants';
import Footer from '../containers/Footer';
import Sidebar from '../containers/Sidebar';
import GlobalActions from '../actions/GlobalActions';
import { disconnect, serverConnect } from '../actions/SocketActions';
import ErrorScreen from '../components/Error/ErrorScreen';
import NotFoundScreen from '../components/Error/NotFoundScreen';
import InternetPopup from '../containers/InternetPopup';
import Loader from '../components/Loader';
import NetworkNotification from '../components/NetworkNotification';

class ExplorerApp extends App {

	componentDidMount() {
		Router.events.on('routeChangeStart', () => {
			if (this.props.router.route !== SSR_TRANSACTION_INFORMATION_PATH) {
				this.props.store.dispatch(GlobalActions.updateHistoryPath(this.props.router.asPath, this.props.router.route));
			}
			this.props.store.dispatch(GlobalActions.incrementHistoryLength());
		});
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
			Component, pageProps, store,
		} = this.props;
		const parsedLocation = pathname.split('/')[1];
		const full = Object.keys(CONTRACT_DETAILS_NUMBERS_TAB).includes(parsedLocation);
		const error = store.getState().global.get('error');
		const errorScreen = store.getState().global.get('errorScreen');
		const errorPath = store.getState().global.get('errorPath');
		const clientConnected = store.getState().global.get('connected');
		const connectedServer = store.getState().global.get('connectedServer');
		const networkMode = store.getState().global.get('mode');
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
				<React.Fragment>
					{this.renderMeta()}
					{this.renderModals()}
					<Header />
					{networkMode === TESTNET_MODE && <NetworkNotification />}
					{ ROUTES_WITH_COLUMN_DIRECTION.includes(pathname) ?
						<React.Fragment>
							<div className="wrap">
								<Sidebar />
							</div>
							<Component {...pageProps} />
							<Footer />
						</React.Fragment> :
						<React.Fragment>
							<div className={classnames('wrap', 'flex', { full })}>
								<Component {...pageProps} />
								<Sidebar pinned withFooter />
							</div>
							<Footer />
						</React.Fragment>
					}
					<InternetPopup />
				</React.Fragment>
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
		await ctx.store.dispatch(GlobalActions.setMode());
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
