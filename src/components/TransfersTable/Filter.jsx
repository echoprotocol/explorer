import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Input from '../Input';
import BlueBtn from '../../components/Buttons/BlueBtn';
import { KEY_CODE_ENTER } from '../../constants/GlobalConstants';

const TransfersFilter = React.memo(({
	open, onChangeFilter, from, to, onClearFilter, onSubmitFilter, fromError, toError,
}) => {
	const onKeyPress = (e) => {
		const code = e.keyCode || e.which;
		if (KEY_CODE_ENTER !== code) { return; }
		onSubmitFilter(e);
	};
	return (
		<div className={cn('operations-filter', { open })}>
			<div className="operations-filter-wrap">
				<div className="operations-filter-item">
					<span className="operations-filter-caption">Sender</span>
					<Input
						name="from"
						hundleClear={(name) => onClearFilter(name)}
						value={from}
						error={fromError}
						onKeyDown={onKeyPress}
						onChange={(e) => onChangeFilter(e)}
						placeholder="Sender name"
					/>
				</div>
				<div className="operations-filter-item">
					<span className="operations-filter-caption">Receiver</span>
					<Input
						name="to"
						hundleClear={(name) => onClearFilter(name)}
						value={to}
						error={toError}
						onKeyDown={onKeyPress}
						onChange={(e) => onChangeFilter(e)}
						placeholder="Receiver name"
					/>
				</div>
				<div className="operations-filter__button">
					<BlueBtn name="Apply filters" onClick={onSubmitFilter} isLoading={false} />
				</div>
			</div>
		</div>
	);
});

TransfersFilter.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onChangeFilter: PropTypes.func.isRequired,
	onClearFilter: PropTypes.func.isRequired,
	onSubmitFilter: PropTypes.func.isRequired,
	fromError: PropTypes.string,
	toError: PropTypes.string,
};

TransfersFilter.defaultProps = {
	from: '',
	to: '',
	fromError: '',
	toError: '',
};

export default TransfersFilter;
