import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disconnect } from '../actions/SocketActions';

import Toast from '../components/Toast';
import Header from './Header';

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
				{children}
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
