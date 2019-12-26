import React from 'react';
import PropTypes from 'prop-types';
import BackwardIcon from '../BackwardIcon';

export default function pageHeader(props) {
	const {
		returnFunction, title, children, icon,
	} = props;
	return (
		<div className="page-header">
			{
				returnFunction &&
					<a
						href=""
						className="backwards-link"
						onClick={(e) => { e.preventDefault(); returnFunction(false); }}
					>
						<BackwardIcon />
					</a>
			}
			{ icon }
			<h2 className="page-title">{title}</h2>
			{ children }
		</div>
	);
}

pageHeader.propTypes = {
	title: PropTypes.string,
	returnFunction: PropTypes.func,
	icon: PropTypes.node,
	children: PropTypes.node,
};

pageHeader.defaultProps = {
	title: '',
	returnFunction: null,
	children: null,
	icon: null,
};

