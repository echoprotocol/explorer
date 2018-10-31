import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap_white.css';

class SimplePreparingBlock extends React.Component {

	render() {

		const {
			title, smallTitle, description, status, tooltip, className,
		} = this.props;

		return (
			<React.Fragment>
				<div className={`preparing-element ${status} ${className}`}>
					{
						(tooltip) ? (
							<Tooltip placement="rightTop" trigger={['hover']} overlay={<span>Description on hover (in two or more lines)</span>}>
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
									<div className="tooltip">
										<svg
											width="9px"
											height="9px"
										>
											<path
												fillRule="evenodd"
												opacity="0.6"
												fill="rgb(111, 123, 130)"
												d="M4.500,9.000 C2.015,9.000 0.000,6.985 0.000,4.500 C0.000,2.015 2.015,0.000 4.500,0.000 C6.985,0.000 9.000,2.015 9.000,4.500 C9.000,6.985 6.985,9.000 4.500,9.000 ZM4.500,1.000 C2.567,1.000 1.000,2.567 1.000,4.500 C1.000,6.433 2.567,8.000 4.500,8.000 C6.433,8.000 8.000,6.433 8.000,4.500 C8.000,2.567 6.433,1.000 4.500,1.000 ZM4.500,7.000 C4.224,7.000 4.000,6.776 4.000,6.500 L4.000,4.500 C4.000,4.224 4.224,4.000 4.500,4.000 C4.776,4.000 5.000,4.224 5.000,4.500 L5.000,6.500 C5.000,6.776 4.776,7.000 4.500,7.000 ZM4.500,3.000 C4.224,3.000 4.000,2.776 4.000,2.500 C4.000,2.224 4.224,2.000 4.500,2.000 C4.776,2.000 5.000,2.224 5.000,2.500 C5.000,2.776 4.776,3.000 4.500,3.000 Z"
											/>
										</svg>
									</div>
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
					<div className="status-container">
						<div className="description">
							<span className="text">{description}</span> {(status) && (<div className="status-icn" />)}
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
};

SimplePreparingBlock.defaultProps = {
	status: '',
	className: '',
};

export default SimplePreparingBlock;
