import React from 'react';
import PropTypes from 'prop-types';
import { AverageBlockIcon } from '../../components/Icons/HeaderIcons';
import TimeFace from '../../components/Time/TimeFace';

const Block3 = React.memo((props) => (
	<React.Fragment>
		<div className="preparing-head">
			<AverageBlockIcon />
			<TimeFace time={props.averageBlockTime} />
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Average block time (last 24h)</span>
		</div>
	</React.Fragment>
));

Block3.propTypes = {
	averageBlockTime: PropTypes.number.isRequired,
};

export default Block3;
