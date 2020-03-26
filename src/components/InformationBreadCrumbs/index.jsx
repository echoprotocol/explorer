import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class BreadCrumbs extends React.Component {

	render() {

		return (
			<React.Fragment>
				<div className="breadcrumbs-container">
					{this.props.breadcrumbs && this.props.breadcrumbs.map((breadcrumb) => (
						<Link
							key={breadcrumb.title}
							to={breadcrumb.path}
							className="element"
						>
							{breadcrumb.title}
						</Link>
					))}
				</div>
			</React.Fragment>
		);
	}

}

BreadCrumbs.propTypes = {
	breadcrumbs: PropTypes.array,
};

BreadCrumbs.defaultProps = {
	breadcrumbs: [],
};

export default BreadCrumbs;
