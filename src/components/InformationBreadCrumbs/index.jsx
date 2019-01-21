import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
						<svg
							width="17px"
							height="20px"
						>
							<path
								fillRule="evenodd"
								fill="rgb(24, 20, 42)"
								d="M16.000,11.000 L3.362,11.000 L10.176,18.173 C10.566,18.584 10.566,19.250 10.176,19.661 C9.785,20.072 9.152,20.072 8.762,19.661 L0.276,10.729 C-0.114,10.318 -0.114,9.651 0.276,9.240 L8.762,0.307 C9.152,-0.104 9.785,-0.104 10.176,0.307 C10.566,0.718 10.566,1.385 10.176,1.796 L3.333,9.000 L16.000,9.000 C16.552,9.000 17.000,9.448 17.000,10.000 C17.000,10.552 16.552,11.000 16.000,11.000 Z"
							/>
						</svg>
					</a>
					<div className="title">{title}</div>
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
