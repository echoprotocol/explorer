import React from 'react';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';

const Block2 = React.memo(() => (
	<React.Fragment>
		<div className="preparing-head">
			<LatestBlockIcon />
			<span className="preparing-caption">
				<span className="accent">12h </span> : 33m : 43s
			</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Latest block time</span>
		</div>
	</React.Fragment>
));

export default Block2;
