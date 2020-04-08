import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreparingBlock from './PreparingBlock';
import Block1 from './Block1';
import Block2 from './Block2';
import Block3 from './Block3';
import Block4 from './Block4';

const PreparingSection = (props) => {
	// const [time, setTime] = useState(0);
	const { latestBlock, blocks } = props;
	const lastTimestamp = Date.parse(blocks.getIn([latestBlock, 'timestamp']));
	const GMT = new Date().getTimezoneOffset();
	const diff = (Date.now() - lastTimestamp) + (GMT * 60 * 1000);
	let a = diff;
	setInterval(() => {
		console.log(111)
		a += 1000;
		console.log(a)
	}, 1000);
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
