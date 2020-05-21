import React, { useEffect, useState, memo } from 'react';
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

import { BLOCKS_TABLE_PATH } from '../../constants/RouterConstants';

const BlocksTable = (({
	blocks, goToBlock, label, isAllBlocks, router, filterAndPaginateData,
	getBlocks, latestBlock,
}) => {
	const [didMount, setDidMount] = useState(false);
	useEffect(() => setDidMount(true), []);

	const [handledBlocks, setBlocks] = useState(blocks);
	useEffect(() => {
		const interval = setInterval(() => {
			setBlocks([...blocks]);
		}, 1000);
		return () => clearInterval(interval);
	}, [blocks]);

	useEffect(() => {
		const loadBlocks = async () => {
			const { asPath } = router;
			if (!asPath) {
				return;
			}
			const { query: search } = queryString.parseUrl(asPath);
			await getBlocks(search.p, search.l);
		};
		if (didMount) {
			loadBlocks();
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

	const { asPath } = router;
	const { currentPage, sizePerPage } = filterAndPaginateData;
	let page = currentPage;
	let onPage = sizePerPage;
	if (asPath) {
		const { query: search } = queryString.parseUrl(asPath);
		page = search.p || currentPage;
		onPage = search.l || sizePerPage;
	}
	return (
		<div className={cn('main-page-table', { full: isAllBlocks })}>
			<TableLabel label={label} />
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
				totalDataSize={latestBlock}
				currentPage={Number(page)}
				sizePerPage={Number(onPage)}
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
	latestBlock: PropTypes.number,
};

BlocksTable.defaultProps = {
	isAllBlocks: false,
	label: '',
	router: {},
	filterAndPaginateData: {},
	getBlocks: () => { },
	latestBlock: 0,
};

export default memo(BlocksTable);
