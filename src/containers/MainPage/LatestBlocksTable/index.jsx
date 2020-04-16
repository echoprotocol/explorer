import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import TableLabel from '../../../components/TableLabel';

import Thead from './Thead';
import Row from './Row';

const LatestBlocksTable = memo(({ blocks, goToBlock }) => (
	<div className="main-page-table">
		<TableLabel label="Latest Blocks" />
		<PerfectScrollbar>
			<table>
				<Thead />
				<tbody>
					<tr className="air"><td /></tr>
					{ blocks.map((data) => (
						<React.Fragment key={data.round}>
							<Row
								date={data.date}
								number={data.blockNumber}
								age={data.time}
								producer={data.producer}
								size={{ weight: data.weight, weightSize: data.weightSize }}
								txs={data.transactions}
								onClick={(e) => goToBlock(e, data.round)}
							/>
						</React.Fragment>
					))
					}
				</tbody>

			</table>
		</PerfectScrollbar>
		{/* <ArrowBtn>View all Blocks</ArrowBtn> */}
	</div>
));

LatestBlocksTable.propTypes = {
	blocks: PropTypes.array.isRequired,
	goToBlock: PropTypes.func.isRequired,
};
export default LatestBlocksTable;
