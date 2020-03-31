import React from 'react';
import { AverageBlockIcon } from '../../components/Icons/HeaderIcons';

const Block3 = React.memo(() => (
	<React.Fragment>
		<div className="preparing-head">
			<AverageBlockIcon />
			<span className="preparing-caption ">
				<span className="accent">33m </span> : 43s
			</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Average block time (last 24h)</span>
		</div>
	</React.Fragment>
));

export default Block3;
