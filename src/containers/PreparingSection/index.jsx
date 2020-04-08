import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreparingBlock from './PreparingBlock';
import Block1 from './Block1';
import Block2 from './Block2';
import Block3 from './Block3';
import Block4 from './Block4';

const PreparingSection = () => (
	<div className="preparing-wrap">
		<PreparingBlock><Block1 /></PreparingBlock>
		<PreparingBlock><Block2 /></PreparingBlock>
		<PreparingBlock><Block3 /></PreparingBlock>
		<PreparingBlock><Block4 /></PreparingBlock>
	</div>
);

PreparingSection.propTypes = {
	latestBlock: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		latestBlock: state.round.get('latestBlock'),
	}),
	() => ({}),
)(PreparingSection);
