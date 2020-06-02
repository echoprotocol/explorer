import React, { useEffect, useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import cn from 'classnames';
import Link from 'next/link';
import queryString from 'query-string';

import TableLabel from '../TableLabel';
import TablePagination from '../../components/TablePagination';
import Thead from './Thead';
import Row from './Row';
import ArrowBtn from '../../components/Buttons/ArrowBtn';

import FormatHelper from '../../helpers/FormatHelper';

import { BLOCKS_TABLE_PATH, SSR_CURRENT_COMMITTEE_PATH } from '../../constants/RouterConstants';

const BlocksTable = (({
	blocks, goToBlock, label, isAllBlocks, router, filterAndPaginateData,
	getBlocks, initData,
}) => {
	const didMount = useRef(false);

	const [handledBlocks, setBlocks] = useState(blocks);
	useEffect(() => {
		const interval = setInterval(() => {
			setBlocks([...blocks]);
		}, 1000);
		return () => clearInterval(interval);
	}, [blocks]);

	useEffect(() => {
		const loadBlocks = async () => {
			await getBlocks();
		};
		const { asPath } = router;
		if (!asPath) {
			return;
		}
		const { query: search } = queryString.parseUrl(asPath);
		const { totalDataSize } = filterAndPaginateData;
		initData({ ...search, totalDataSize });
		if (didMount.current) {
			loadBlocks();
		} else {
			didMount.current = true;
		}
	}, [router.asPath]);

	const getLastByDay = () => {
		const lastBlocksArr = [];
		blocks.forEach((block) => {
			const blockDiff = moment().diff(moment.utc(block.time), 'seconds');
			const blockDate = FormatHelper.getBlockDateByTimestamp(block.time);
			if (blockDiff > 86400) {
				if (lastBlocksArr.length === 0) {
					lastBlocksArr.push({
						number: block.blockNumber,
						date: blockDate,
					});
				} else {
					const isLastBlocksContainsDate = lastBlocksArr.some((item) => item.date === blockDate);
					if (!isLastBlocksContainsDate) {
						lastBlocksArr.push({
							number: block.blockNumber,
							date: blockDate,
						});
					}
				}
			}
			return null;
		});
		return lastBlocksArr.map((item) => item.number);
	};

	return (
		<div className={cn('main-page-table', { full: isAllBlocks })}>
			<TableLabel label={label}>
				<Link href={SSR_CURRENT_COMMITTEE_PATH} as={SSR_CURRENT_COMMITTEE_PATH}>
					<a className="link">View Committee members</a>
				</Link>
			</TableLabel>
			<PerfectScrollbar>
				<table>
					<Thead isAllBlocks={isAllBlocks} />
					<tbody>
						<tr className="air"><td /></tr>
						{ handledBlocks.map((data) => (
							<React.Fragment key={data.round}>
								<Row
									isAllBlocks={isAllBlocks}
									isLastByDay={getLastByDay() && getLastByDay().includes(data.blockNumber)}
									time={data.time}
									number={data.blockNumber}
									reward={data.reward}
									rewardCurrency={data.rewardCurrency}
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
			{isAllBlocks &&
			<TablePagination
				from={filterAndPaginateData.filters.from}
				to={filterAndPaginateData.filters.to}
				router={router}
				totalDataSize={filterAndPaginateData.totalDataSize}
				currentPage={filterAndPaginateData.currentPage}
				sizePerPage={filterAndPaginateData.sizePerPage}
			/>}
			{!isAllBlocks &&
			<Link as={BLOCKS_TABLE_PATH} href={BLOCKS_TABLE_PATH}>
				<a className="main-page-table__btn">
					<ArrowBtn>View all Blocks</ArrowBtn>
				</a>
			</Link>}
		</div>
	);
});

BlocksTable.propTypes = {
	isAllBlocks: PropTypes.bool,
	label: PropTypes.string,
	blocks: PropTypes.array.isRequired,
	goToBlock: PropTypes.func.isRequired,
	router: PropTypes.object,
	filterAndPaginateData: PropTypes.object,
	getBlocks: PropTypes.func,
	initData: PropTypes.func.isRequired,
};

BlocksTable.defaultProps = {
	isAllBlocks: false,
	label: '',
	router: {},
	filterAndPaginateData: {},
	getBlocks: () => { },
};

export default memo(BlocksTable);
