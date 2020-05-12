import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TableLabel from '../TableLabel';
import Thead from './Thead';
import FilterBtn from '../FilterBtn';
import TransfersFilter from './Filter';
import TransferPagination from './Pagination';
import Row from './Row';

class TransfersTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isFilterOpen: false,
		};
		this.toggleFilter = this.toggleFilter.bind(this);
	}

	toggleFilter(e) {
		const { isFilterOpen } = this.state;
		e.target.blur();
		this.setState({ isFilterOpen: !isFilterOpen });
	}

	render() {
		const {	label } = this.props;
		const { isFilterOpen } = this.state;
		return (
			<div className="transfers-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<TransfersFilter
					from=""
					to=""
					open={isFilterOpen}
					onChangeFilter={() => {}}
					onClearFilter={() => {}}
				/>
				<PerfectScrollbar>
					<table>
						<Thead />
						<tbody>
							<tr className="air"><td /></tr>
							<Row
								id={1}
								date="09.03.2020 11:15"
								block="21"
								sender="nathan"
								receiver="init1"
								amount={{
									value: '123',
									coin: 'ECHO',
								}}
								onClick={() => {}}
							/>
						</tbody>
					</table>
				</PerfectScrollbar>
				<TransferPagination
					sizePerPage={20}
					totalDataSize={1}
					currentPage={1}
				/>
			</div>
		);
	}

}

TransfersTable.propTypes = {
	label: PropTypes.string,
};


TransfersTable.defaultProps = {
	label: 'Transfers',
};

export default TransfersTable;
