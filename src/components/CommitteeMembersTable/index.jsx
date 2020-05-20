import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

import Thead from './Thead';
import Row from './Row';

const CommitteeMembersTable = ({ members, type }) => (
	<div className="members-table">
		<PerfectScrollbar>
			<table>
				<Thead type={type} />
				<tbody>
					<tr className="air"><td /></tr>
					{members.map((data, i) => (
						<React.Fragment>
							<Row
								data={data}
								index={i}
								onClick={(e) => {}}
							/>
						</React.Fragment>
					))
					}
				</tbody>
			</table>
		</PerfectScrollbar>
	</div>
);

CommitteeMembersTable.propTypes = {
	members: PropTypes.array.isRequired,
	type: PropTypes
		.oneOf([COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS, COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES, COMMITTEE_TABLE_TYPE.FORMER_MEMBERS])
		.isRequired,
};


export default memo(CommitteeMembersTable);
