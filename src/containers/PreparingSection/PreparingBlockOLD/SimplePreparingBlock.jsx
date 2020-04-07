import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import InfoTooltip from 'rc-tooltip';

class SimplePreparingBlock extends React.Component {

	render() {

		const {
			title, smallTitle, description, status, tooltip, className, tip,
		} = this.props;

		return (
			<React.Fragment>
				<div
					className={`preparing-element ${status} ${className}`}
					onMouseEnter={() => this.changeHover(true)}
					onMouseLeave={() => this.changeHover(false)}
				>
					{
						(tooltip) ? (
							<InfoTooltip overlay={<span>{tip}</span>}>
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
								</div>
							</InfoTooltip>
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
