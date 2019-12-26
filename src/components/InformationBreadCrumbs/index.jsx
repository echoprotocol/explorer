import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';


class BreadCrumbs extends React.Component {

	render() {

		const {
			breadcrumbs,
			blockNavigation,
			blockNumber, latestBlock,
			onPrevBlock, onNextBlock,
		} = this.props;

		return (
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

		);
	}

}

BreadCrumbs.propTypes = {
	breadcrumbs: PropTypes.array,
	blockNavigation: PropTypes.bool,
	blockNumber: PropTypes.number,
	latestBlock: PropTypes.number,
	onPrevBlock: PropTypes.func,
	onNextBlock: PropTypes.func,

};

BreadCrumbs.defaultProps = {
	latestBlock: null,
	blockNumber: null,
	onPrevBlock: null,
	onNextBlock: null,
	breadcrumbs: [],
	blockNavigation: false,

};

export default BreadCrumbs;
