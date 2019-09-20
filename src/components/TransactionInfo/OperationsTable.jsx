import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';

import OperationRow from './OperationRow';
import LoadMoreBtn from '../LoadMoreBtn';

import URLHelper from '../../helpers/URLHelper';

class OperationsTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showedOperations: [],
			airRows: [],
		};

		this.tableRefs = [];
	}

	componentDidMount() {
		const { showedOperations } = this.state;
		const queryProps = queryString.parse(this.props.location.search);

		if (!queryProps.op) {
			return;
		}
		const op = parseInt(queryProps.op, 10);
		if (!this.tableRefs[op - 1]) {
			return;
		}
		showedOperations.push(op - 1);
		this.setState({ showedOperations }); // eslint-disable-line react/no-did-mount-set-state
	}

	componentDidUpdate(prevProps) {
		const { loading, location: { search } } = this.props;
		const { loading: prevLoading, location: { search: prevSearch } } = prevProps;

		const parsed = queryString.parse(search);
		const prevParsed = queryString.parse(prevSearch);
		if (!loading && loading !== prevLoading) {
			if (!parsed.op || !this.tableRefs[parsed.op - 1]) {
				return;
			}
			this.tableRefs[parsed.op - 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		if (!parsed.op && prevParsed.op) {
			this.setState({ showedOperations: [] }); // eslint-disable-line react/no-did-update-set-state
		}
	}

	toggleOperationDetails(index) {
		const { pathname, search } = this.props.location;
		const { showedOperations, airRows } = this.state;
		const queryProps = queryString.parse(search);
		const v = showedOperations.indexOf(index);

		if (v !== -1) {
			showedOperations.splice(v, 1);

			if (queryProps.op && parseInt(queryProps.op, 10) - 1 === index) {
				this.props.history.push(pathname);
			}

			[index - 1, index].forEach((i) => {
				const airIndex = airRows.indexOf(i);

				if (airIndex !== -1) {
					airRows.splice(airIndex, 1);
				}
			});
		} else {
			showedOperations.push(index);
			if (this.props.changeUrl) {
				this.props.history.push(URLHelper.createTransactionOperationUrl(pathname, index + 1));
			}
		}

		if (showedOperations.includes(index) && airRows.indexOf(index - 1) === -1) {
			airRows.push(index - 1);
		}

		if (showedOperations.includes(index) && airRows.indexOf(index) === -1) {
			airRows.push(index);
		}

		this.setState({ showedOperations, airRows });
	}

	renderTable() {
		const { operations, hasMore, loading } = this.props;
		const { showedOperations, airRows } = this.state;

		return (
			<div className="accordion-table-wrap">
				<table>
					<Media query="(max-width: 767px)">
						{ (matches) => !matches &&
							<thead>
								<tr>
									<td />
									<td className="number"><div className="td-in">#</div></td>
									<td className="type"><div className="td-in">Type</div></td>
									<td className="sender"><div className="td-in">Sender</div></td>
									<td className="reciever"><div className="td-in">Reciever</div></td>
									<td className="amount"><div className="td-in">Amount</div></td>
									<Media query="(max-width: 1000px)">
										{
											(matchesIn) =>
												(!matchesIn && <td className="fee"><div className="td-in">Operation fee</div></td>)
										}
									</Media>

									<td className="rezult"><div className="td-in">Result</div></td>
									<td className="json"><div className="td-in">JSON</div></td>
									<td className="dd" />
									<td />
								</tr>
							</thead>

						}
					</Media>


					<tbody>
						<Media query="(max-width: 767px)">
							{
								(matches) =>
									(!matches &&
									<tr className="air">
										<td colSpan="9" />
									</tr>)
							}
						</Media>
						{
							operations ? operations.map((op, i) => (
								<OperationRow
									key={i.toString()}
									operation={op}
									index={i}
									active={showedOperations.includes(i)}
									air={airRows.includes(i)}
									tableRefs={this.tableRefs}
									toggleOperationDetails={(index) => this.toggleOperationDetails(index)}
								/>
							)) : null
						}
					</tbody>
				</table>
				{
					hasMore ?
						<LoadMoreBtn
							loading={loading}
							loadMore={() => this.props.loadMore()}
						/> : null
				}
			</div>
		);
	}

	render() {
		const { hasMore, loadMore } = this.props;


		return (
			loadMore ?
				<InfiniteScroll loadMore={() => this.props.loadMore()} hasMore={hasMore} >
					{this.renderTable()}
				</InfiniteScroll> :
				this.renderTable()
		);
	}

}


OperationsTable.propTypes = {
	operations: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	hasMore: PropTypes.bool,
	changeUrl: PropTypes.bool,
	loadMore: PropTypes.func,
};


OperationsTable.defaultProps = {
	hasMore: false,
	changeUrl: false,
	loading: false,
	loadMore: null,
};

export default OperationsTable;
