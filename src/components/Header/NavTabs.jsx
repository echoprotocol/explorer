import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import { INDEX_PATH, NODE_MAP_PATH } from '../../constants/RouterConstants';

class NavTabs extends React.Component {

	render() {
		const { pathName, history } = this.props;

		return (
			<div className="navigation-tabs">
				<button
					className={classnames({ active: pathName === INDEX_PATH })}
					onClick={() => history.push(INDEX_PATH)}
				>
					Blocks
				</button>
				<button
					className={classnames({ active: pathName === NODE_MAP_PATH })}
					onClick={() => history.push(NODE_MAP_PATH)}
				>
					Nodes map
				</button>
			</div>
		);
	}

}

NavTabs.propTypes = {
	pathName: PropTypes.string.isRequired,
	history: PropTypes.object,
};
NavTabs.defaultProps = {
	history: {},
};
export default withRouter(connect(
	(state) => ({
		pathName: state.router.location.pathname,
	}),
	() => ({}),
)(NavTabs));
