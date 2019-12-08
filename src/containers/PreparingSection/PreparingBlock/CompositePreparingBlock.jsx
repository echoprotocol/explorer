import React from 'react';
import PropTypes from 'prop-types';

class CompositePreparingBlock extends React.Component {

	render() {

		const {
			title, description, status, tooltip, className
		} = this.props;

		return (
			<React.Fragment>
				<div className={`preparing-element ${status} ${className}`}>
					<div className="title">
						<span className={status === '' ? '' : "current-step"}>{title}</span>
						{(tooltip) && <div className="tooltip" />}
					</div>
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

CompositePreparingBlock.propTypes = {
	status: PropTypes.string,
	className: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	tooltip: PropTypes.bool,
};

CompositePreparingBlock.defaultProps = {
	status: '',
	className: '',
	title: '',
	description: '',
	tooltip: false,
};

export default CompositePreparingBlock;
