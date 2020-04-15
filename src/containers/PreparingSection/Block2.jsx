import React from 'react';
import PropTypes from 'prop-types';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';
import Timer from '../../components/Time/Timer';

const calculateTimestamp = (latestBlock, blocks) => {
	const lastTimestamp = blocks.getIn([latestBlock, 'timestamp']);
	if (!lastTimestamp) {
		return 0;
	}
	const GMT = new Date().getTimezoneOffset();
	const diff = (Date.now() - Date.parse(lastTimestamp)) + (GMT * 60 * 1000);
	return Math.floor(diff / 1000);
};

const Block2 = React.memo(({ latestBlock, blocks }) => (
	<React.Fragment>
		<div className="preparing-head">
			<LatestBlockIcon />
			<span className="preparing-caption">
				<Timer diff={calculateTimestamp(latestBlock, blocks)} />
			</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Latest block time</span>
		</div>
	</React.Fragment>
));

Block2.propTypes = {
	blocks: PropTypes.object.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default Block2;
