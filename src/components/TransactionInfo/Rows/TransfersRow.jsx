import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import URLHelper from '../../../helpers/URLHelper';
import FormatHelper from '../../../helpers/FormatHelper';

import Avatar from '../../Avatar';

import arrow from '../../../public/images/icons/transfer-field-arrow.svg';

const TransfersRow = ({ title, transfers }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			{transfers.map((transfer) => (
				<span className="transfers-field" key={transfer.from.link} >
					<div className="transfers-field__amount">
						<span className="transfers-field__amount-value">{FormatHelper.formatAmount(transfer.amount.amount, transfer.amount.precision)}&nbsp;</span>
						<span className="transfers-field__amount-currency">{transfer.amount.symbol}</span>
					</div>
					<div className="transfers-field__accounts">
						<div className="transfers-field__accounts-from">
							<Link className="avatar-wrap" to={URLHelper.createUrlById(transfer.from.link)}>
								{transfer.from.value && <Avatar accountName={transfer.from.value} />}
								<span>{transfer.from.value ? transfer.from.value : transfer.from.link}</span>
							</Link>
						</div>
						<div className="transfers-field__accounts-divider">
							<img src={arrow} alt="divider" />
						</div>
						<div className="transfers-field__accounts-to">
							<Link className="avatar-wrap" to={URLHelper.createUrlById(transfer.to.link)}>
								{transfer.to.value && <Avatar accountName={transfer.to.value} />}
								<span>{transfer.to.value ? transfer.to.value : transfer.to.link}</span>
							</Link>
						</div>
					</div>
				</span>
			))}
		</div>
	</div>
);

TransfersRow.propTypes = {
	title: PropTypes.string.isRequired,
	transfers: PropTypes.array.isRequired,
};

export default TransfersRow;
