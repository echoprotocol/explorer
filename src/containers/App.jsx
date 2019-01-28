import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { disconnect } from '../actions/SocketActions';

import Toast from '../components/Toast';
import Header from './Header';
import RecentBlockSidebar from './RecentBlockSection/RecentBlockSidebar';


class App extends React.Component {

	componentDidMount() {
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
	title: PropTypes.string.isRequired,
};

export default connect(
	(state) => ({
		title: state.global.get('title'),
	}),
	(dispatch) => ({
		disconnect: () => dispatch(disconnect()),
	}),
)(App);
