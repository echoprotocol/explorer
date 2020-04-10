import React from 'react';
import PropTypes from 'prop-types';
import PreparingBlock from './PreparingBlock';
import Block1 from './Block1';
import Block2 from './Block2';
import Block3 from './Block3';
import Block4 from './Block4';

const PreparingSection = (props) => (
	<div className="preparing-wrap">
		<PreparingBlock>
			<Block1
				stepProgress={props.stepProgress}
				preparingBlock={props.preparingBlock}
				latestBlock={props.latestBlock}
			/>
		</PreparingBlock>
		<PreparingBlock><Block2 /></PreparingBlock>
		<PreparingBlock><Block3 /></PreparingBlock>
		<PreparingBlock><Block4 /></PreparingBlock>
	</div>
);

PreparingSection.propTypes = {
	stepProgress: PropTypes.string.isRequired,
	preparingBlock: PropTypes.number.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default PreparingSection;
