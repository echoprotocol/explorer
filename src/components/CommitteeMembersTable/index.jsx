import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

import Thead from './Thead';
import Row from './Row';
import TablePagination from '../../components/TablePagination';
import Loader from '../Loader';

const CommitteeMembersTable = ({
	members,
	gridName,
	router,
	filterAndPaginateData,
	initData,
	onLoadCommittee,
	loading,
}) => {

	if (loading) {
		return <Loader />;
	}

	let scrollBarRef;

	filterAndPaginateData = filterAndPaginateData.toJS();
	const { query: search } = queryString.parseUrl(router.asPath);

	const updateScroll = () => {
		if (scrollBarRef) {
			scrollBarRef.updateScroll();
		}
	};

	const onChangeOperationFilters = async (filters) => {
		const { totalDataSize } = filterAndPaginateData;
		await initData({ ...filters, totalDataSize });
		await onLoadCommittee();
	};

	useEffect(() => {
		window.addEventListener('resize', updateScroll);
		return () => window.removeEventListener('resize', updateScroll);
	});

	useEffect(() => {
		onChangeOperationFilters(search);
	}, [search.l, search.p]);

	return (
		<div className="members-table">
			<PerfectScrollbar ref={(ref) => { scrollBarRef = ref; return null; }} >
				<table>
					<Thead type={gridName} />
					<tbody>
						<tr className="air"><td /></tr>
						{members.map((data, i) => (
							<React.Fragment key={`${gridName}${data.id}`}>
								<Row
									type={gridName}
									data={data}
									index={i}
								/>
							</React.Fragment>
						))
						}
					</tbody>
				</table>
			</PerfectScrollbar>
			<TablePagination
				router={router}
				totalDataSize={filterAndPaginateData.totalDataSize}
				currentPage={filterAndPaginateData.currentPage}
				sizePerPage={filterAndPaginateData.sizePerPage}
			/>
		</div>
	);
};

CommitteeMembersTable.propTypes = {
	members: PropTypes.array.isRequired,
	gridName: PropTypes
		.oneOf([CANDIDATE_COMMITTEE_GRID, CURRENT_COMMITTEE_GRID, DEACTIVATED_COMMITTEE_GRID])
		.isRequired,
	router: PropTypes.object.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	onLoadCommittee: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};


export default CommitteeMembersTable;
