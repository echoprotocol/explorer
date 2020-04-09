import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreparingBlock from './PreparingBlock';
import Block1 from './Block1';
import Block2 from './Block2';
import Block3 from './Block3';
import Block4 from './Block4';


const calculateTimestamp = (latestBlock, blocks) => {
	const lastTimestamp = blocks.getIn([latestBlock, 'timestamp']);
	if (!lastTimestamp) {
		return 0;
	}
	const GMT = new Date().getTimezoneOffset();
	const diff = (Date.now() - Date.parse(lastTimestamp)) + (GMT * 60 * 1000);
	return Math.floor(diff / 1000);
};

const PreparingSection = (props) => {
	const { latestBlock, blocks } = props;
	const diff = calculateTimestamp(latestBlock, blocks)
	return (
		<div className="preparing-wrap">
			<PreparingBlock><Block1 /></PreparingBlock>
			<PreparingBlock><Block2 diff={diff} /></PreparingBlock>
			<PreparingBlock><Block3 /></PreparingBlock>
			<PreparingBlock><Block4 /></PreparingBlock>
		</div>
	);
};

PreparingSection.propTypes = {
	blocks: PropTypes.object.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
	}),
	() => ({}),
)(PreparingSection);
