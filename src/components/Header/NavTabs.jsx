import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Router, { withRouter } from 'next/router';

import { INDEX_PATH, NODE_MAP } from '../../constants/RouterConstants';

class NavTabs extends React.Component {

	render() {
		const { pathname } = this.props;

		return (
			<div className="navigation-tabs">
				<button
					className={classnames({ active: pathname === INDEX_PATH })}
					onClick={() => Router.push(INDEX_PATH)}
				>
					Blocks
				</button>
				<button
					className={classnames({ active: pathname === NODE_MAP })}
					onClick={() => Router.push(NODE_MAP)}
				>
					Nodes map
				</button>
			</div>
		);
	}

}

NavTabs.propTypes = {
	pathname: PropTypes.string.isRequired,
};

NavTabs.defaultProps = {};

export default withRouter(connect(
	(state, props) => ({
		pathname: props.router.pathname,
	}),
	() => ({}),
)(NavTabs));
