import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import cn from 'classnames';
import Link from 'next/link';

import TableLabel from '../TableLabel';
import FilterBtn from '../FilterBtn';
import TableFilter from '../../components/TableFilter';
import TablePagination from '../../components/TablePagination';
import Thead from './Thead';
import Row from './Row';
import ArrowBtn from '../../components/Buttons/ArrowBtn';

import FormatHelper from '../../helpers/FormatHelper';

import { BLOCKS_TABLE_PATH } from '../../constants/RouterConstants';

const BlocksTable = (({
	blocks, goToBlock, label, isAllBlocks, router, filterAndPaginateData,
}) => {
	const [handledBlocks, setBlocks] = useState(blocks);
	const [isFilterOpen, setFilterOpen] = useState(false);
	const [field, setField] = useState({
		from: {
			error: '',
			value: '',
		},
		to: {
			error: '',
			value: '',
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setBlocks([...blocks]);
		}, 1000);
		return () => clearInterval(interval);
	}, [blocks]);

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

	const toggleFilter = (e) => {
		e.target.blur();
		setFilterOpen(!isFilterOpen);
	};

	const onChangeFilter = (e) => {
		const { name, value } = e.target;
		setField({
			...field,
			[name]: {
				value,
			},
		});
	};

	const onClearFilter = (name) => {
		setField({
			...field,
			[name]: {
				value: '',
			},
		});
	};

	return (
		<div className={cn('main-page-table', { full: isAllBlocks })}>
			{ isAllBlocks ?
				<TableLabel label={label}>
					<FilterBtn onClick={toggleFilter} />
				</TableLabel> :
				<TableLabel label={label} />
			}
			<TableFilter
				open={isFilterOpen}
				from={field.from.value}
				fromError={field.from.error}
				to={field.to.value}
				toError={field.to.error}
				onChangeFilter={(e) => onChangeFilter(e)}
				onClearFilter={(name) => onClearFilter(name)}
				onSubmitFilter={() => {}}
			/>
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
};

BlocksTable.defaultProps = {
	isAllBlocks: false,
	label: '',
	router: {},
	filterAndPaginateData: {},
};

export default memo(BlocksTable);
