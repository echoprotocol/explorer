import React from 'react';
import Tooltip from 'rc-tooltip';
import { NextBlockIcon } from '../../components/Icons/HeaderIcons';
import { InfoIcon } from '../../components/Icons/InfoIcon';

const Block1 = () => (
	<React.Fragment>
		<div className="preparing-head">
			<NextBlockIcon />
			<span className="preparing-caption accent">2,515</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Next block: waiting for txs</span>
			<Tooltip
				placement="rightBottom"
				trigger={['hover']}
				overlay={<span>next block information</span>}
			>
				<span className="preparing-tooltip"><InfoIcon /></span>
			</Tooltip>
			<a href="">Echo rand info</a>
		</div>
	</React.Fragment>
);

export default Block1;
