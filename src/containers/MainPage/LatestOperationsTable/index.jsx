import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// import ArrowBtn from '../../../components/Buttons/ArrowBtn';
import TableLabel from '../../../components/TableLabel';

import Thead from './Thead';
import Row from './Row';

const LatestOperationsTable = memo(({ operations }) => (
	<div className="main-page-table">
		<TableLabel label="Latest Operations" />
		<PerfectScrollbar>
			<table>
				<Thead />
				<tbody>
					<tr className="air"><td /></tr>
					{operations.map((data) => (
						<React.Fragment key={`${data.blockNumber}${data.trIndex}${data.opIndex}`}>
							<Row
								operation={data.type}
								from={data.mainInfo.from.name}
								to={data.mainInfo.subject.name}
								amount={{ value: data.mainInfo.value.amount || 0, coin: data.mainInfo.value.symbol }}
							/>
						</React.Fragment>
					))
					}
				</tbody>
			</table>
		</PerfectScrollbar>
		{/* <ArrowBtn>View all Operations</ArrowBtn> */}
	</div>
));

LatestOperationsTable.propTypes = {
	operations: PropTypes.array.isRequired,
};
export default LatestOperationsTable;
