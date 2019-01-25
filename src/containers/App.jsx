import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disconnect } from '../actions/SocketActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';


class App extends React.Component {

	componentWillUnmount() {
		this.props.disconnect();
	}

	renderModals() {
		return (
			<div />
		);
	}

	render() {
		const { children } = this.props;

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

}

App.propTypes = {
	children: PropTypes.element.isRequired,
	disconnect: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
