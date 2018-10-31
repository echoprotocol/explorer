import React from 'react';
import PropTypes from 'prop-types';

class CompositePreparingBlock extends React.Component {

	render() {

		const {
			title, description, status, tooltip, className, currentStep, totalStep,
		} = this.props;

		return (
			<React.Fragment>
				<div className={`preparing-element ${status} ${className}`}>
					<div className="title">
						<span className="current-step">{currentStep}</span>&nbsp;{`of ${totalStep}:${title}`}
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
	currentStep: PropTypes.string.isRequired,
	totalStep: PropTypes.string.isRequired,
};

CompositePreparingBlock.defaultProps = {
	status: '',
	className: '',
	title: '',
	description: '',
	tooltip: false,
};

export default CompositePreparingBlock;
