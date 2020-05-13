import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../Input';
import FilterBtn from '../../components/Buttons/FilterBtn';
import { KEY_CODE_ENTER } from '../../constants/GlobalConstants';

const OperationsFilter = React.memo(({
	open, onChangeFilter, from, to, onClearFilter, onSubmitFilter, fromError, toError, loading,
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
						onChange={(e) => onChangeFilter(e)}
						placeholder="Sender name"
						onKeyDown={(e) => onKeyPress(e)}
					/>
				</div>
				<div className="operations-filter-item">
					<span className="operations-filter-caption">Receiver</span>
					<Input
						name="to"
						hundleClear={(name) => onClearFilter(name)}
						value={to}
						error={toError}
						onChange={(e) => onChangeFilter(e)}
						placeholder="Receiver name"
						onKeyDown={(e) => onKeyPress(e)}
					/>
				</div>
				<div className="operations-filter__button">
					<FilterBtn name="Apply filters" isLoading={loading} onClick={onSubmitFilter} disabled={loading} />
				</div>
			</div>
		</div>
	);
});

OperationsFilter.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onChangeFilter: PropTypes.func.isRequired,
	onClearFilter: PropTypes.func.isRequired,
	onSubmitFilter: PropTypes.func.isRequired,
	fromError: PropTypes.string,
	toError: PropTypes.string,
	loading: PropTypes.bool.isRequired,
};

OperationsFilter.defaultProps = {
	from: '',
	to: '',
	fromError: '',
	toError: '',
};

export default OperationsFilter;
