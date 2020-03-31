
import React from 'react';
import { OperationsBlockIcon } from '../../components/Icons/HeaderIcons';

const Block4 = React.memo(() => (
	<React.Fragment>
		<div className="preparing-head">
			<OperationsBlockIcon />
			<span className="preparing-caption accent">3,456</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Operations (last 7 days)</span>
		</div>
	</React.Fragment>
));

export default Block4;

