import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import App from './App';

const AppWrapper = ({ route }) => (
	<App>{renderRoutes(route.routes)}</App>
);

AppWrapper.propTypes = {
	route: PropTypes.objectOf(PropTypes.any),
};

AppWrapper.defaultProps = {
	route: null,
};

export default AppWrapper;
