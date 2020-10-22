import React from 'react';
import PropTypes from 'prop-types';
import { NextBlockIcon } from '../../components/Icons/HeaderIcons';
import InfoTooltip from '../../components/InfoTooltip';
import { rounderSteps } from '../../constants/RoundConstants';
import FormatHelper from '../../helpers/FormatHelper';

const getStatus = (nodeStatus) => nodeStatus && rounderSteps[nodeStatus].title;

const Block1 = React.memo((props) => (
	<React.Fragment>
		<div className="preparing-head">
			<NextBlockIcon />
			<span className="preparing-caption accent">{FormatHelper.formatAmount(props.latestBlock, 0)}</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">
				<span>Next block:
					<span style={{ color: '#e9eaef' }}>
						{FormatHelper.formatAmount(props.latestBlock + 1, 0)}&nbsp;
					</span>
				</span>
				<span>{getStatus(props.stepProgress)}</span>
				<InfoTooltip iconFilled={false} overlay="Next block info" />
			</span>
		</div>
	</React.Fragment>
));

Block1.propTypes = {
	stepProgress: PropTypes.string.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default Block1;
