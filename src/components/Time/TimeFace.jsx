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

	const m = momentTime.get('minute');
	const s = momentTime.get('second');

	const fullH = getFullHour(momentTime);
	const fullS = s === 0 && !m && !fullH ? undefined : `${s}s`;
	const fullM = m === 0 && !s && !fullH ? undefined : `${m}m`;

	const ftiltredTime = [fullH, fullM, fullS].filter((v) => v);

	const [primeTime = '0s', ...restTime] = ftiltredTime;
	const restTimeWithSeparators = restTime.length === 0 ? undefined : ` : ${restTime.join(' : ')}`;

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
