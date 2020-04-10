import React from 'react';
import { NextBlockIcon } from '../../components/Icons/HeaderIcons';
import InfoTooltip from '../../components/InfoTooltip';

const Block1 = React.memo(() => (
	<React.Fragment>
		<div className="preparing-head">
			<NextBlockIcon />
			<span className="preparing-caption accent">2,515</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">
				Next block: waiting for txs
				<InfoTooltip iconFilled={false} overlay="Next block info" />
			</span>
			<a href="">Echo rand info</a>
		</div>
	</React.Fragment>
));

export default Block1;
