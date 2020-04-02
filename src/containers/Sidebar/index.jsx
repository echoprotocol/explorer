import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Sidebar from '../../components/Sidebar';

const SidebarContainer = React.memo(() => (
	<Sidebar />
));

SidebarContainer.propTypes = {};

export default withRouter(connect(
	() => ({}),
	() => ({}),
)(SidebarContainer));
