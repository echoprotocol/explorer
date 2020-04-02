import React from 'react';
import Input from '../Input';
import Button from '../Button';
// import PropTypes from 'prop-types';

const OperationsPagination = () => (
	<div className="operations-pagination">
		<div className="pg-nav-1">
			<div className="pg-caption">Operations per page:</div>
			<button className="pg-page-btn">20</button>
			<button className="pg-page-btn active">50</button>
			<button className="pg-page-btn">100</button>
		</div>
		<div className="pg-nav-2">
			<div className="pg-caption">Page:</div>
			<Input name="pg-input" className="pg-input" placeholder="page" value="1" />
			<div className="pg-caption">out of <a href="/">720</a></div>
		</div>
		<div className="pg-nav-3">
			<Button className="primary-btn" disabled>
				<div className="pg-arrow">
					<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 2.5L0 5V0l4 2.5z" />
					</svg>
					<div className="pg-arrow-caption">
						Previous
					</div>
				</div>
			</Button>
			<Button className="primary-btn">
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

// OperationsPagination.propTypes = {};

export default OperationsPagination;
