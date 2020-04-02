import React from 'react';
import PropTypes from 'prop-types';

import NotFound from '../containers/Error/NotFoundScreen';

const Error = ({ statusCode, ...data }) => {
	console.log('data', data);

	return statusCode === 404 ? <NotFound /> : (
		<p>
			An error occurred on client
		</p>
	);
};

Error.getInitialProps = ({ res, err }) => {
	let statusCode;
	if (res) {
		statusCode = res.statusCode;
	} else {
		statusCode = err ? err.statusCode : 404;
	}

	return { statusCode };
};

Error.propTypes = {
	statusCode: PropTypes.number,

};

Error.defaultProps = {};

export default Error;
