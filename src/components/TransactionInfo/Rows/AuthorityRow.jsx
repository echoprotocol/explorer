import React from 'react';
import PropTypes from 'prop-types';

import InfoTooltip from '../../../components/InfoTooltip';

const AuthorityRow = ({
	title, authority, tooltip,
}) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{tooltip &&
				<span className="description">
					<span className="description-main">
						Public keys and accounts
					</span>
					<span className="description-secondary">
						<InfoTooltip
							overlay={tooltip}
							iconFilled={false}
							placement="topLeft"
						/>
						<span className="description-secondary__name">Treshold:&nbsp;</span>
						<span className="description-secondary__value">1</span>
					</span>
				</span>}
			{authority.length !== 0 &&
				authority.map((item) => (
					<div className="authority-field" key={item.value}>
						<div className="authority-field__info">
							<a href="" className="link">
								{item.value}
							</a>
							<span className="authority-field__info-description">
								<span>Weight:&nbsp;</span>
								<span>{item.weight}</span>
							</span>
						</div>
					</div>
				))
			}
		</div>
	</div>
);

AuthorityRow.propTypes = {
	title: PropTypes.string.isRequired,
	authority: PropTypes.array,
	tooltip: PropTypes.string,
};

AuthorityRow.defaultProps = {
	authority: [],
	tooltip: '',
};

export default AuthorityRow;
