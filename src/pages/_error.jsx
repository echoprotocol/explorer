import React from 'react';

import NotFound from '../components/Error/NotFoundScreen';

const Error = () => <NotFound />;

Error.getInitialProps = ({ res, err }) => {
	let statusCode;
	if (res) {
		({ statusCode } = res);
	} else {
		statusCode = err ? err.statusCode : 404;
	}

	return { statusCode };
};

export default Error;
