import React from 'react';
import Input from '../Input';
// import PropTypes from 'prop-types';

const OperationsPagination = () => (
	<div className="operations-pagination">
		<div className="col">
			<div className="pg-nav-1">
				<div className="pg-caption">Operations per page:</div>
				<button className="pg-page-btn">20</button>
				<button className="pg-page-btn active">50</button>
				<button className="pg-page-btn">100</button>
			</div>
		</div>
		<div className="col">
			<div className="pg-nav-2">
				<div className="pg-caption">Page:</div>
				<Input name="pg-input" className="pg-input" placeholder="page" value="1" />
				<div className="pg-caption">out of <a href="/">720</a></div>
			</div>
		</div>
	</div>
);

// OperationsPagination.propTypes = {};

export default OperationsPagination;
