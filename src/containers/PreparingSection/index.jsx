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
		<PreparingBlock>
			<Block2 blocks={props.blocks} latestBlock={props.latestBlock} />
		</PreparingBlock>
		<PreparingBlock>
			<Block3
				averageBlockTime={props.averageBlockTime}
			/>
		</PreparingBlock>
		<PreparingBlock>
			<Block4
				operationCountRates={props.operationCountRates}
				operationCount={props.operationCount}
			/>
		</PreparingBlock>
	</div>
);

PreparingSection.propTypes = {
	blocks: PropTypes.object.isRequired,
	stepProgress: PropTypes.string.isRequired,
	preparingBlock: PropTypes.number.isRequired,
	latestBlock: PropTypes.number.isRequired,
	averageBlockTime: PropTypes.number.isRequired,
	operationCountRates: PropTypes.array.isRequired,
	operationCount: PropTypes.number.isRequired,
};

export default PreparingSection;
