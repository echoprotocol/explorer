import App from 'next/app';
import { withRouter } from 'next/router';
import echo from 'echojs-lib';
import classnames from 'classnames';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { serialize, deserialize } from 'json-immutable';

import React from 'react';
import configureStore from '../store';

import '../../public/loader';
import Header from '../containers/Header';
import Modal from '../containers/Modals';

import { CONTRACT_DETAILS_NUMBERS_TAB } from '../constants/RouterConstants';
import Footer from '../containers/Footer';
import RecentBlockSidebar from '../containers/RecentBlockSection/RecentBlockSidebar';
import GlobalActions from '../actions/GlobalActions';

// import '../src/assets/favicon.ico';

class ExplorerApp extends App {

	static async getInitialProps({ Component, ctx }) {
		console.log('getInitialProps ExplorerApp', ctx.isServer);

		try {
			// console.log('process.env.API_URL', ctx.isServer);
			// console.log('echo.isConnectedL', echo.isConnected);

			if (ctx.isServer && !echo.isConnected) {
				console.log('connect', process.env.API_URL);
				await echo.connect(process.env.API_URL, {
					connectionTimeout: 5000,
					maxRetries: 1e10,
					pingTimeout: 6000,
					pingDelay: 5000,
					debug: false,
					apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node'],
					// apis: ['database', 'network_broadcast', 'history', 'registration', 'asset', 'login', 'network_node', 'echorand'],
				});
			}
		} catch (err) {
			console.log('err connect to echo', JSON.stringify(err, null, 10));
		}

		// const mobile = new MobileDetect(req.headers['user-agent']);

		// await ctx.store.dispatch(globalActions.init());

		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		return { pageProps };
	}

	componentDidMount() {
		console.log('componentDidMount ExplorerApp');
		this.props.store.dispatch(GlobalActions.init());
	}

	renderModals() {
		return (
			<Modal />
		);
	}

	render() {
		const {
			// children,
			// error,
			// errorPath,
			// errorScreen,
			router: { pathname },
			// subscribeConnect,
			// showInternetConnectionBar,
			isShowModal,

			Component, pageProps, store,
		} = this.props;
		const parsedLocation = pathname.split('/')[1];
		const full = Object.keys(CONTRACT_DETAILS_NUMBERS_TAB).includes(parsedLocation);

		const connected = store.getState().global.get('connected');
		console.log('store.global.get(\'connected\')', connected, typeof window !== 'undefined');

		return (
			<Provider store={store}>
				<div>
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
						{/* <Toast /> */}
						{/* { */}
						{/*	showInternetConnectionBar && <InternetPopup isConnected={subscribeConnect} /> */}
						{/* } */}
					</div>
				</div>
			</Provider>
		);
	}

}

ExplorerApp.propTypes = {
	router: PropTypes.object,
};

ExplorerApp.defaultProps = {
	router: {},
};

const STORE = () => {
	try {
		const store = configureStore().getState();
		var serializedStore = serialize(configureStore().getState());
	} catch (err) {
		console.log('err', err);
	}
	return serializedStore;
};

const withReduxJob = withRedux(
	(initialState) => {
		console.log('configureStore');
		return configureStore(initialState);
	},
	{
		serializeState: (state = {}) => {
			console.log('serializeState');
			return serialize(state);
		},
		deserializeState: (state = STORE()) => {
			console.log('deserializeState');
			return deserialize(state);
		},
	},
);

export default withRouter(withReduxJob(ExplorerApp));
