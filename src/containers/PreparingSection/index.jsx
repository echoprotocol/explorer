import React from 'react';
// import Tooltip from 'rc-tooltip';
import PreparingBlock from './PreparingBlock';
import ic1 from '../../assets/images/icons/header/next-block-icon.svg';
import { InfoIcon } from '../../components/Icons/InfoIcon';

const PreparingSection = () => (
	<div className="preparing-wrap">
		<PreparingBlock>
			<React.Fragment>
				<div className="preparing-head">
					<img src={ic1} className="preparing-icon" alt="" />
					<span className="preparing-caption accent">2,515</span>
				</div>
				<div className="preparing-line">
					<span className="preparing-text">Next block: waiting for txs</span>
					<InfoIcon />

					{/* <Tooltip
						placement="rightBottom"
						trigger={['hover']}
						overlay={<span>some information</span>}
					>asd
					</Tooltip> */}
				</div>
			</React.Fragment>
		</PreparingBlock>
		{/* <PreparingBlock />
		<PreparingBlock />
		<PreparingBlock /> */}
	</div>
);

export default PreparingSection;
