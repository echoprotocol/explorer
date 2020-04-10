import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Router, { withRouter } from 'next/router';

import { INDEX_PATH, NODE_MAP } from '../../constants/RouterConstants';

const NavTabs = React.memo(({ router: { pathname } }) => (
	<div className="nav-tabs">
		<button
			className={cn({ active: pathname === INDEX_PATH })}
			onClick={() => Router.push(INDEX_PATH)}
		>
			Blocks
		</button>
		<button
			className={cn({ active: pathname === NODE_MAP })}
			onClick={() => Router.push(NODE_MAP)}
		>
			Nodes map
		</button>
	</div>
));

NavTabs.propTypes = {
	router: PropTypes.object.isRequired,
};

NavTabs.defaultProps = {};

export default withRouter(NavTabs);
