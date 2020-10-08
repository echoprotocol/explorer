import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import queryString from 'query-string';

import { SIZES_PER_PAGE } from '../../constants/TableConstants';
import Input from '../Input';

import { KEY_CODE_ENTER } from '../../constants/GlobalConstants';
import TypesHelper from '../../helpers/TypesHelper';
import URLHelper from '../../helpers/URLHelper';
import Button from '../Button';
import { NextButton } from '../Button/NextButton';
import { PrevButton } from '../Button/PrevButton';


const TablePagination = ({
	currentPage, totalDataSize, sizePerPage, router, from, to, reverse,
}) => {
	const { url: pathname, query } = queryString.parseUrl(router.asPath);
	const [inputCurrentPage, setCurrentPage] = useState(currentPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalDataSize / sizePerPage));

	const nextPageLink = URLHelper.createOperationUrlByFilter(pathname, query, {
		p: currentPage + 1, from, to, l: sizePerPage,
	});

	const prevPageLink = URLHelper.createOperationUrlByFilter(pathname, query, {
		p: currentPage - 1, from, to, l: sizePerPage,
	});
	const lastPageLink = URLHelper.createOperationUrlByFilter(pathname, query, {
		p: totalPages, from, to, l: sizePerPage,
	});

	const onChangeInputCurrentPage = (value) => setCurrentPage(value);

	const onKeyPressInputCurrentPage = (e) => {
		const code = e.keyCode || e.which;
		const { value } = e.target;
		if (KEY_CODE_ENTER !== code) { return; }
		if (!TypesHelper.isStringNumber(value)) { return; }
		const newNumberPage = parseInt(value, 10);
		if (!(newNumberPage > 0 && newNumberPage < totalPages + 1)) { return; }
		const linkToPage = URLHelper.createOperationUrlByFilter(router.pathname, router.query, {
			p: newNumberPage, from, to, l: sizePerPage,
		});
		Router.push(router.route, linkToPage);
	};

	useEffect(() => {
		setCurrentPage(currentPage);
	}, [currentPage, sizePerPage]);

	useEffect(() => {
		setTotalPages(Math.ceil(totalDataSize / sizePerPage));
	}, [totalDataSize, sizePerPage]);

	const sizePerPages = Array.from(new Set([...SIZES_PER_PAGE, sizePerPage].sort((a, b) => a - b)));

	const goToPage = (e, link) => {
		e.preventDefault();
		Router.push(router.route, link);
	};

	return (
		<div className="table-pagination">
			<div className="pg-nav-1">
				<div className="pg-caption">Operations per page:</div>
				{sizePerPages.map((size) => {
					const link = URLHelper.createOperationUrlByFilter(pathname, query, {
						l: size, p: 1, from, to,
					});
					return (
						<Link key={size} href={router.route} >
							<a onClick={(e) => goToPage(e, link)} href={link} className={cn('pg-page-btn', { active: size === sizePerPage })}>{size}</a>
						</Link>
					);
				})}
			</div>
			<div className="pg-nav-2">
				<label htmlFor="pg-input" className="pg-caption">Page</label>
				<Input
					name="pg-input"
					className="pg-input"
					placeholder="page"
					value={inputCurrentPage.toString()}
					onChange={(e) => onChangeInputCurrentPage(e.target.value)}
					onKeyDown={(e) => onKeyPressInputCurrentPage(e, totalPages)}
					disabled={!totalPages}
				/>
				<div className="pg-caption">out of
					{!totalPages ? <span> 1</span> : <a href={lastPageLink} onClick={(e) => goToPage(e, lastPageLink)}> {totalPages}</a>}
				</div>
			</div>
			<div className="pg-nav-3">
				{!totalPages || currentPage === 1 ? (
					<Button className="primary-btn" disabled>
						<PrevButton reverse={reverse} />
					</Button>
				) : (
					<a href={prevPageLink} onClick={(e) => goToPage(e, prevPageLink)} className={cn('pg-arrow', 'primary-btn')}>
						<PrevButton reverse={reverse} />
					</a>
				)}
				{!totalPages || totalPages === currentPage ? (
					<Button className="primary-btn" disabled>
						<NextButton reverse={reverse} />
					</Button>
				) : (
					<a href={nextPageLink} onClick={(e) => goToPage(e, nextPageLink)} className={cn('pg-arrow', 'primary-btn')}>
						<NextButton reverse={reverse} />
					</a>
				)}
			</div>
		</div>
	);
};

TablePagination.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	router: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
	reverse: PropTypes.bool,
};

TablePagination.defaultProps = {
	from: '',
	to: '',
	reverse: false,
};

export default TablePagination;
