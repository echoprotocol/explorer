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


const OperationsPagination = ({
	currentPage, totalDataSize, sizePerPage, router,
}) => {
	const { url: pathname, query } = queryString.parseUrl(router.asPath);
	const [inputCurrentPage, setCurrentPage] = useState(currentPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalDataSize / sizePerPage));

	const nextPageLink = URLHelper.createOperationUrlByFilter(pathname, query, { p: currentPage + 1 });
	const prevPageLink = URLHelper.createOperationUrlByFilter(pathname, query, { p: currentPage - 1 });
	const lastPageLink = URLHelper.createOperationUrlByFilter(pathname, query, { p: totalPages });

	const onChangeInputCurrentPage = (value) => setCurrentPage(value);

	const onKeyPressInputCurrentPage = (e) => {
		const code = e.keyCode || e.which;
		const { value } = e.target;
		if (KEY_CODE_ENTER !== code) { return; }
		if (!TypesHelper.isStringNumber(value)) { return; }
		const newNumberPage = parseInt(value, 10);
		if (!(newNumberPage > 0 && newNumberPage < totalPages + 1)) { return; }
		const linkToPage = URLHelper.createOperationUrlByFilter(router.pathname, router.query, { p: newNumberPage });
		Router.push(router.route, linkToPage);
	};

	useEffect(() => {
		setCurrentPage(currentPage);
	}, [currentPage, sizePerPage]);

	useEffect(() => {
		setTotalPages(Math.ceil(totalDataSize / sizePerPage));
	}, [totalDataSize, sizePerPage]);

	const sizePerPages = Array.from(new Set([...SIZES_PER_PAGE, sizePerPage].sort((a, b) => a - b)));
	let index = sizePerPages.findIndex((size) => size > totalDataSize);

	const goToPage = (e, link, isDisable) => {
		e.preventDefault();
		if (isDisable) { return; }
		Router.push(router.route, link);
	};

	if (index === -1) {
		index = sizePerPages.length - 1;
	}

	return (
		<div className="operations-pagination">
			<div className="pg-nav-1">
				<div className="pg-caption">Operations per page:</div>
				{sizePerPages.slice(0, index + 1).map((size) => {
					const link = URLHelper.createOperationUrlByFilter(pathname, query, { l: size, p: 1 });
					return (
						<Link key={size} href={router.route} >
							<a onClick={(e) => goToPage(e, link)} href={link} className={cn('pg-page-btn', { active: size === sizePerPage })}>{size}</a>
						</Link>
					);
				})}
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
				<div className="pg-caption">out of <a href={lastPageLink} onClick={(e) => goToPage(e, lastPageLink)}>{totalPages}</a></div>
			</div>
			<div className="pg-nav-3">
				<Link href={router.route} >
					<a
						href={prevPageLink}
						onClick={(e) => goToPage(e, prevPageLink, currentPage === 1)}
						className={cn('pg-arrow', 'primary-btn', { disabled: currentPage === 1 })}
					>
						<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 2.5L0 5V0l4 2.5z" />
						</svg>
						<div className="pg-arrow-caption">
							Previous
						</div>
					</a>
				</Link>
				<Link href={router.route}>
					<a
						href={nextPageLink}
						onClick={(e) => goToPage(e, nextPageLink, totalPages === currentPage)}
						className={cn('pg-arrow', 'primary-btn', { disabled: totalPages === currentPage })}
					>
						<div className="pg-arrow-caption">
							Next
						</div>
						<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 2.5L0 5V0l4 2.5z" />
						</svg>
					</a>
				</Link>
			</div>
		</div>
	);
};

OperationsPagination.propTypes = {
	router: PropTypes.object.isRequired,
	currentPage: PropTypes.number.isRequired,
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
};

OperationsPagination.defaultProps = {};

export default OperationsPagination;
