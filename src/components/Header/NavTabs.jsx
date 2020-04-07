import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router';

import { INDEX_PATH, NODE_MAP } from '../../constants/RouterConstants';

const NavTabs = React.memo(({ pathName, history }) => (
	<div className="nav-tabs">
		<button
			className={cn({ active: pathName === INDEX_PATH })}
			onClick={() => history.push(INDEX_PATH)}
		>
			Blocks
		</button>
		<button
			className={cn({ active: pathName === NODE_MAP })}
			onClick={() => history.push(NODE_MAP)}
		>
			Nodes map
		</button>
	</div>
));

NavTabs.propTypes = {
	pathName: PropTypes.string.isRequired,
	history: PropTypes.object,
};

NavTabs.defaultProps = {
	history: {},
};

export default withRouter(NavTabs);
