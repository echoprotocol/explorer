import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ArrowBtn from '../../../components/Buttons/ArrowBtn';
import TableLabel from '../../../components/TableLabel';

import Thead from './Thead';
import Row from './Row';

const LatestOperationsTable = memo(({ blocks }) => (
	<div className="main-page-table">
		<TableLabel label="Latest Operations" />
		<PerfectScrollbar>
			<table>
				<Thead />
				<tbody>
					<tr className="air"><td /></tr>
					<Row
						operation="Block reward"
						from="dima1"
						to="dima1"
						amount={{ value: 0.00000670, coin: 'ECHO' }}
					/>
				</tbody>
			</table>
		</PerfectScrollbar>
		<ArrowBtn>View all Operations</ArrowBtn>
	</div>
));

LatestOperationsTable.propTypes = {
	blocks: PropTypes.array.isRequired,
};
export default LatestOperationsTable;
