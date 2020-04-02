import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../Input';

const OperationsFilter = ({ open }) => {
	// TODO: Remove state, hundleChange and hundleClear; use Ract.Memo
	const [receiver, setReceiver] = useState('');
	const [sender, setSender] = useState('');

	const hundleChange = (e) => {
		if (e.target.name === 'receiver-input') {
			setReceiver(e.target.value);
			return;
		}
		if (e.target.name === 'sender-input') {
			setSender(e.target.value);
		}
	};
	const hundleClear = (name) => {
		if (name === 'sender-input') {
			setSender('');
			return;
		}
		if (name === 'receiver-input') {
			setReceiver('');
		}
	};

	return (
		<div className={cn('operations-filter', { open })}>
			<div className="operations-filter-wrap">
				<div className="operations-filter-item">
					<span className="operations-filter-caption">Receiver</span>
					<Input
						name="receiver-input"
						hundleClear={(name) => hundleClear(name)}
						value={receiver}
						onChange={(e) => hundleChange(e)}
						placeholder="Receiver name"
					/>
				</div>
				<div className="operations-filter-item">
					<span className="operations-filter-caption">Sender</span>
					<Input
						name="sender-input"
						hundleClear={(name) => hundleClear(name)}
						value={sender}
						onChange={(e) => hundleChange(e)}
						placeholder="Sender name"
					/>
				</div>
			</div>
		</div>
	);
};

OperationsFilter.propTypes = {
	open: PropTypes.bool.isRequired,
};

export default OperationsFilter;

