import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BackwardIcon from '../BackwardIcon';

class BreadCrumbs extends React.Component {

	render() {

		const { title } = this.props;

		return (
			<div className="information-breadcrumbs">
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
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => { e.preventDefault(); this.props.returnFunction(false); }}
					>
						<BackwardIcon />
					</a>
					<h2 className="page-title">{title}</h2>
				</div>
			</div>
		);
	}

}

BreadCrumbs.propTypes = {
	title: PropTypes.string,
	returnFunction: PropTypes.func,
	breadcrumbs: PropTypes.array,
};

BreadCrumbs.defaultProps = {
	title: null,
	returnFunction: null,
	breadcrumbs: [],
};

export default BreadCrumbs;
