import React from 'react';
import PropTypes from 'prop-types';

const SidebarElement = ({ children, title }) => (
	<div className="sidebar-element">
		<h3 className="sidebar-element-title">{title}</h3>
		<div className="sidebar-element-wrap">
			{children}
		</div>
	</div>
);

SidebarElement.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
};

export default SidebarElement;
