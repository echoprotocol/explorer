import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { SIZES_PER_PAGE } from '../../constants/TableConstants';
import Input from '../Input';

import Button from '../Button';
import { NextButton } from '../Button/NextButton';
import { PrevButton } from '../Button/PrevButton';


const TransfersPagination = ({
	sizePerPage, totalDataSize, currentPage,
}) => {
	const sizePerPages = Array.from(new Set([...SIZES_PER_PAGE, sizePerPage].sort((a, b) => a - b)));
	const [totalPages, setTotalPages] = useState(Math.ceil(totalDataSize / sizePerPage));

	useEffect(() => {
		setTotalPages(Math.ceil(totalDataSize / sizePerPage));
	}, [totalDataSize, sizePerPage]);

	return (
		<div className="operations-pagination">
			<div className="pg-nav-1">
				<div className="pg-caption">Operations per page:</div>
				{sizePerPages.map((size) => (
					<a onClick={() => {}} href="#" className={cn('pg-page-btn', { active: size === sizePerPage })}>{size}</a>
				))}
			</div>
			<div className="pg-nav-2">
				<label htmlFor="pg-input" className="pg-caption">Page:</label>
				<Input
					name="pg-input"
					className="pg-input"
					value="1"
					onChange={() => {}}
					onKeyDown={() => {}}
				/>
				<div className="pg-caption">
					out of
					{!totalPages ? <span> {totalPages}</span> : <a href="#" onClick={() => {}}> {totalPages}</a>}
				</div>
			</div>
			<div className="pg-nav-3">
				{!totalPages || currentPage === 1 ? (
					<Button className="primary-btn" disabled>
						<PrevButton />
					</Button>
				) : (
					<a href="#" onClick={() => {}} className={cn('pg-arrow', 'primary-btn')}>
						<PrevButton />
					</a>
				)}
				{!totalPages || totalPages === currentPage ? (
					<Button className="primary-btn" disabled>
						<NextButton />
					</Button>
				) : (
					<a href="#" onClick={() => {}} className={cn('pg-arrow', 'primary-btn')}>
						<NextButton />
					</a>
				)}
			</div>
		</div>
	);
};

TransfersPagination.propTypes = {
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
};


export default TransfersPagination;
