import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { SIZES_PER_PAGE } from '../../constants/TableConstants';
import Input from '../Input';
import Button from '../Button';
import { KEY_CODE_ENTER } from '../../constants/GlobalConstants';
import TypesHelper from '../../helpers/TypesHelper';

const OperationsPagination = ({
	currentPage, totalDataSize, sizePerPage, onChangeCurrentPage, onChangeSizePerPage,
}) => {
	const [inputCurrentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalDataSize / sizePerPage));

	const onChangeInputCurrentPage = (value) => setCurrentPage(value);

	const onKeyPressInputCurrentPage = (e) => {
		const code = e.keyCode || e.which;
		const { value } = e.target;
		if (KEY_CODE_ENTER !== code) { return; }
		if (!TypesHelper.isStringNumber(value)) { return; }
		const newNumberPage = parseInt(value, 10);
		if (!(newNumberPage > 0 && newNumberPage < totalPages + 1)) { return; }
		onChangeCurrentPage(newNumberPage);
	};

	useEffect(() => {
		const index = SIZES_PER_PAGE.findIndex((size) => size > totalDataSize);
		const initIndex = SIZES_PER_PAGE.findIndex((size) => size === sizePerPage);
		if (initIndex > index) {
			onChangeSizePerPage(SIZES_PER_PAGE[0]);
		}
	}, []);
	useEffect(() => {
		setCurrentPage(currentPage);
	}, [currentPage, sizePerPage]);

	useEffect(() => {
		setTotalPages(Math.ceil(totalDataSize / sizePerPage));
	}, [totalDataSize, sizePerPage]);

	let index = SIZES_PER_PAGE.findIndex((size) => size > totalDataSize);

	if (index === -1) {
		index = SIZES_PER_PAGE.length - 1;
	}

	return (
		<div className="operations-pagination">
			<div className="pg-nav-1">
				<div className="pg-caption">Operations per page:</div>
				{SIZES_PER_PAGE.slice(0, index + 1).map((size) => (
					<button
						key={size}
						onClick={() => onChangeSizePerPage(size)}
						className={cn('pg-page-btn', { active: size === sizePerPage })}
					>
						{size}
					</button>
				))}
			</div>
			<div className="pg-nav-2">
				<div className="pg-caption">Page:</div>
				<Input
					name="pg-input"
					className="pg-input"
					placeholder="page"
					value={inputCurrentPage.toString()}
					onChange={(e) => onChangeInputCurrentPage(e.target.value)}
					onKeyDown={(e) => onKeyPressInputCurrentPage(e, totalPages)}
				/>
				<div className="pg-caption">out of <a href="/">{totalPages}</a></div>
			</div>
			<div className="pg-nav-3">
				<Button className="primary-btn" disabled={currentPage === 1} onClick={() => onChangeCurrentPage(currentPage - 1)}>
					<div className="pg-arrow">
						<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 2.5L0 5V0l4 2.5z" />
						</svg>
						<div className="pg-arrow-caption">
							Previous
						</div>
					</div>
				</Button>
				<Button className="primary-btn" disabled={totalPages === currentPage} onClick={() => onChangeCurrentPage(currentPage + 1)}>
					<div className="pg-arrow">
						<div className="pg-arrow-caption">
							Next
						</div>
						<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 2.5L0 5V0l4 2.5z" />
						</svg>
					</div>
				</Button>
			</div>
		</div>
	);
};

OperationsPagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
	onChangeCurrentPage: PropTypes.func.isRequired,
	onChangeSizePerPage: PropTypes.func.isRequired,
};

OperationsPagination.defaultProps = {};

export default OperationsPagination;
