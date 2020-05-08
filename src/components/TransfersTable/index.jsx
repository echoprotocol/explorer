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
		const { label, tokenTransfers, coin } = this.props;
		const { isFilterOpen } = this.state;
		return (
			<div className="transfers-table">
				<TableLabel label={label}>
					<FilterBtn onClick={this.toggleFilter} />
				</TableLabel>
				<TransfersFilter
					open={isFilterOpen}
				/>
				<PerfectScrollbar>
					<table>
						<Thead />
						<tbody>
							{tokenTransfers.map((tr, i) => (
								<React.Fragment>
									<tr className="air" key={tr.timestamp}><td /></tr>
									<Row
										id={i + 1}
										date={new Date(tr.timestamp).toUTCString().replace('GMT', '')}
										block={tr.block}
										sender={tr.from.name}
										receiver={tr.to.name}
										amount={{
											value: tr.amount,
											coin,
										}}
										onClick={() => { }}
									/>
								</React.Fragment>
							))}
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
	tokenTransfers: PropTypes.array,
	label: PropTypes.string,
	coin: PropTypes.string,
};


TransfersTable.defaultProps = {
	tokenTransfers: [],
	label: 'Transfers',
	coin: '',
};

export default TransfersTable;
