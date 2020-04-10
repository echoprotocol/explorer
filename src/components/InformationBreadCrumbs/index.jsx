import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class BreadCrumbs extends React.Component {

	render() {

		return (
			<React.Fragment>
				<div className="breadcrumbs-container">
					{this.props.breadcrumbs && this.props.breadcrumbs.map((breadcrumb) => (
						<Link
							key={breadcrumb.title}
							href={breadcrumb.href}
							as={breadcrumb.as}
						>
							<a className="element">{breadcrumb.title}</a>
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
