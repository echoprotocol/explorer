import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { connect as startConnection, disconnect } from '../actions/SocketActions';

import Toast from '../components/Toast';

class App extends React.Component {

	componentDidMount() {
		// this.props.connect();
	}

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
				{children}
				{this.renderModals()}
				<Toast />
			</div>
		);
	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
	connect: PropTypes.func.isRequired,
	disconnect: PropTypes.func.isRequired,
};

export default connect(
	() => ({}),
	(dispatch) => ({
		connect: () => dispatch(startConnection()),
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
