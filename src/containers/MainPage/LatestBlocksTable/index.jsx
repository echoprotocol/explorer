import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

import TableLabel from '../../../components/TableLabel';

import Thead from './Thead';
import Row from './Row';

import FormatHelper from '../../../helpers/FormatHelper';

const LatestBlocksTable = memo(({ blocks, goToBlock }) => {

	const getLastByDay = () => {
		const lastBlocksArr = [];
		blocks.forEach((block) => {
			const blockDiff = moment().diff(moment.utc(block.time), 'seconds');
			const blockDate = 	FormatHelper.getBlockDateByTimestamp(block.time);
			if (blockDiff > 86400) {
				if (lastBlocksArr.length === 0) {
					lastBlocksArr.push({
						number: block.blockNumber,
						date: blockDate,
					});
				} else {
					lastBlocksArr.forEach((item) => {
						if (item && item.date !== blockDate) {
							lastBlocksArr.push({
								number: block.blockNumber,
								date: blockDate,
							});
						}
					});
				}
			}
			return null;
		});
		return lastBlocksArr.map((item) => item.number);
	};

	return (
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
									isLastByDay={getLastByDay() && getLastByDay().includes(data.blockNumber)}
									time={data.time}
									number={data.blockNumber}
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
	);
});

LatestBlocksTable.propTypes = {
	blocks: PropTypes.array.isRequired,
	goToBlock: PropTypes.func.isRequired,
};
export default LatestBlocksTable;
