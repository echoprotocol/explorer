import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/public/bootstrap_white.css';

import infoIcon from '../../../public/images/icons/info-icn.svg';
import infoHoverIcon from '../../../public/images/icons/info-blue.svg';

class SimplePreparingBlock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
		};
	}

	changeHover(value) {
		this.setState({ hovered: value });
	}

	render() {

		const {
			title, smallTitle, description, status, tooltip, className, tip,
		} = this.props;

		const { hovered } = this.state;
		return (
			<React.Fragment>
				<div
					className={`preparing-element ${status} ${className}`}
					onMouseEnter={() => this.changeHover(true)}
					onMouseLeave={() => this.changeHover(false)}
				>
					{
						(tooltip) ? (
							<Tooltip
								placement="rightBottom"
								trigger={['hover']}
								overlay={<span>{tip}</span>}
							>
								<div className="title has-tooltip">
									<Media query="(max-width: 999px)">
										{(matches) =>
											(matches ? (
												(smallTitle) || title
											) : (
												title
											))
										}
									</Media>
									<img src={hovered ? infoHoverIcon : infoIcon} alt="" />
								</div>
							</Tooltip>
						) : (
							<div className="title">
								<Media query="(max-width: 999px)">
									{(matches) =>
										(matches ? (
											(smallTitle) || title
										) : (
											title
										))
									}
								</Media>
							</div>
						)
					}
					<div className="status-container" >
						<div className="description">
							<span	className="text">{description}</span>
							{title === 'Next block' ? '' : <div className="status-icn" />}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

}

SimplePreparingBlock.propTypes = {
	status: PropTypes.string,
	className: PropTypes.string,
	title: PropTypes.string,
	smallTitle: PropTypes.string,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tip: PropTypes.string,
	tooltip: PropTypes.bool,
};

SimplePreparingBlock.defaultProps = {
	status: '',
	className: '',
	title: '',
	smallTitle: '',
	description: '',
	tip: '',
	tooltip: false,
};

export default SimplePreparingBlock;
