import React, { useEffect, memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

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
			{(type === COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES || type === COMMITTEE_TABLE_TYPE.FORMER_MEMBERS) &&
			<TablePagination
				from=""
				to=""
				router={router}
				totalDataSize={20}
				currentPage={1}
				sizePerPage={20}
			/>}
		</div>
	);
};

CommitteeMembersTable.propTypes = {
	members: PropTypes.array.isRequired,
	type: PropTypes
		.oneOf([COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS, COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES, COMMITTEE_TABLE_TYPE.FORMER_MEMBERS])
		.isRequired,
	router: PropTypes.object.isRequired,
};


export default memo(CommitteeMembersTable);
