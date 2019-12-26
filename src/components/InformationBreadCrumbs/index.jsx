import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import BackwardIcon from '../BackwardIcon';

class BreadCrumbs extends React.Component {

	render() {

		const {
			title, breadcrumbs,
			blockNavigation,
			blockNumber, latestBlock,
			onPrevBlock, onNextBlock,
		} = this.props;

		return (
			<div className="information-breadcrumbs">
				<div className="block-navigation-wrap">
					{
						breadcrumbs &&
						<div className="breadcrumbs-container">
							{breadcrumbs.map((breadcrumb) => (
								<Link
									key={breadcrumb.title}
									to={breadcrumb.path}
									className="element"
								>
									{breadcrumb.title}
								</Link>
							))}
						</div>
					}

					{
						blockNavigation &&
						<div className="block-navigation">
							<button
								className={classnames('prev', { active: blockNumber > 1 })}
								disabled={blockNumber <= 1}
								onClick={(e) => onPrevBlock(e)}
							>
								Older <span>block</span>
							</button>
							<button
								className={classnames('next', { active: latestBlock !== blockNumber })}
								disabled={latestBlock === blockNumber}
								onClick={(e) => onNextBlock(e)}
							>
								Next <span>block</span>
							</button>
						</div>
					}
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
	blockNavigation: PropTypes.bool,
	blockNumber: PropTypes.number,
	latestBlock: PropTypes.number,
	onPrevBlock: PropTypes.func,
	onNextBlock: PropTypes.func,

};

BreadCrumbs.defaultProps = {
	title: null,
	returnFunction: null,
	latestBlock: null,
	blockNumber: null,
	onPrevBlock: null,
	onNextBlock: null,
	breadcrumbs: [],
	blockNavigation: false,

};

export default BreadCrumbs;
