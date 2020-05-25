import React, { useEffect, memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

import Thead from './Thead';
import Row from './Row';
import TablePagination from '../../components/TablePagination';

const CommitteeMembersTable = ({ members, type, router }) => {
	let scrollBarRef;


	const updateScroll = () => {
		if (scrollBarRef) {
			scrollBarRef.updateScroll();
		}
	};

	useEffect(() => {
		window.addEventListener('resize', updateScroll);
		return () => window.removeEventListener('resize', updateScroll);
	});

	return (
		<div className="members-table">
			<PerfectScrollbar ref={(ref) => { scrollBarRef = ref; return null; }} >
				<table>
					<Thead type={type} />
					<tbody>
						<tr className="air"><td /></tr>
						{members.map((data, i) => (
							<React.Fragment key={data.id}>
								<Row
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
				from=""
				to=""
				router={router}
				totalDataSize={20}
				currentPage={1}
				sizePerPage={20}
			/>
		</div>
	);
};

CommitteeMembersTable.propTypes = {
	members: PropTypes.array.isRequired,
	type: PropTypes
		.oneOf([CANDIDATE_COMMITTEE_GRID, CURRENT_COMMITTEE_GRID, DEACTIVATED_COMMITTEE_GRID])
		.isRequired,
	router: PropTypes.object.isRequired,
};


export default memo(CommitteeMembersTable);
