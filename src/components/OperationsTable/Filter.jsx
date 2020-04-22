import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../Input';
import FilterBtn from '../../components/Buttons/FilterBtn';

const OperationsFilter = React.memo(({
	open, onChangeFilter, from, to, onClearFilter,
}) => (
	<div className={cn('operations-filter', { open })}>
		<div className="operations-filter-wrap">
			<div className="operations-filter-item">
				<span className="operations-filter-caption">Sender</span>
				<Input
					name="from"
					hundleClear={(name) => onClearFilter(name)}
					value={from}
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
					onChange={(e) => onChangeFilter(e)}
					placeholder="Receiver name"
				/>
			</div>
			<div className="operations-filter__button">
				<FilterBtn name="Apply filters" isLoading={false} />
			</div>
		</div>
	</div>
));

OperationsFilter.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onChangeFilter: PropTypes.func.isRequired,
	onClearFilter: PropTypes.func.isRequired,
};

OperationsFilter.defaultProps = {
	from: '',
	to: '',
};

export default OperationsFilter;

