import React from 'react';
import cn from 'classnames';
import Router, { withRouter, useRouter } from 'next/router';
import { INDEX_PATH, NODE_MAP } from '../../constants/RouterConstants';

const NavTabs = React.memo(() => {
	const router = useRouter();
	return (
		<div className="nav-tabs">
			<button
				className={cn({ active: router.pathname === INDEX_PATH })}
				onClick={() => Router.push(INDEX_PATH)}
			>
				Blocks
			</button>
			<button
				className={cn({ active: router.pathname === NODE_MAP })}
				onClick={() => Router.push(NODE_MAP)}
			>
				Nodes map
			</button>
		</div>
	);
});

export default withRouter(NavTabs);
