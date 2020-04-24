import React from 'react';
import PropTypes from 'prop-types';

import beginIcon from '../../../public/images/icons/policy-begin.svg';
import durationIcon from '../../../public/images/icons/policy-duration.svg';
import cliffIcon from '../../../public/images/icons/policy-cliff.svg';
import FormatHelper from '../../../helpers/FormatHelper';

const PolicyRow = ({ title, objects }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{objects.map((object) => (
				<span className="policy-field" key={object.name}>
					<div className="policy-field__name">{object.name}</div>
					<div className="policy-field-item">
						<img src={beginIcon} alt="begin" className="policy-field-item__icon" />
						<span className="policy-field-item__value">
							{FormatHelper.formatPolicyBeginDate(object.begin_timestamp)}
						</span>
					</div>
					<div className="policy-field-item">
						<img src={durationIcon} alt="begin" className="policy-field-item__icon" />
						<span className="policy-field-item__value">
							{FormatHelper.secondsToFullTime(object.vesting_duration_seconds)}
						</span>
					</div>
					<div className="policy-field-item">
						<img src={cliffIcon} alt="begin" className="policy-field-item__icon" />
						<span className="policy-field-item__value">
							{FormatHelper.secondsToFullTime(object.vesting_cliff_seconds)}
						</span>
					</div>
				</span>
			))}
		</div>
	</div>
);

PolicyRow.propTypes = {
	title: PropTypes.string.isRequired,
	objects: PropTypes.array.isRequired,
};

export default PolicyRow;
