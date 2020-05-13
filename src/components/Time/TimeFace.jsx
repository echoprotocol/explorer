import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const getFullHour = (momentTime) => {
	const fullDays = momentTime.as('days');
	if (fullDays >= 1) {
		return `${Math.floor(momentTime.as('hour'))}h`;
	}

	const h = momentTime.get('hour');

	return h === 0 ? undefined : `${h}h`;
};

const TimeFace = React.memo(({ time }) => {
	const momentTime = moment.duration(time, 'milliseconds');

	const m = momentTime.get('minute') || 0;
	const s = momentTime.get('second') || 0;

	const fullH = getFullHour(momentTime);
	const fullS = `${s}s`;
	const fullM = `${m}m`;

	const ftiltredTime = fullH ? [fullH, fullM, fullS] : [fullM, fullS];

	const [primeTime, ...restTime] = ftiltredTime;

	const restTimeWithSeparators = ` : ${restTime.join(' : ')}`;

	return (
		<React.Fragment>
			<span className="preparing-caption ">
				<span className="accent">{primeTime} </span> {restTimeWithSeparators}
			</span>
		</React.Fragment>
	);
});

TimeFace.propTypes = {
	time: PropTypes.number.isRequired,
};


export default TimeFace;
