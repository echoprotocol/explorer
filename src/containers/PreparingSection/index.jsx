import React from 'react';
// import Tooltip from 'rc-tooltip';
import PreparingBlock from './PreparingBlock';
import Block1 from './Block1';

const PreparingSection = () => (
	<div className="preparing-wrap">
		<PreparingBlock><Block1 /></PreparingBlock>
		<PreparingBlock><Block1 /></PreparingBlock>
		<PreparingBlock><Block1 /></PreparingBlock>
		<PreparingBlock><Block1 /></PreparingBlock>
		{/* <PreparingBlock />
		<PreparingBlock />
		<PreparingBlock /> */}
	</div>
);

export default PreparingSection;
