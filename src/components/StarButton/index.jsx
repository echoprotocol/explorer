import React, { Component } from 'react';
import PropTypes from 'prop-types';
import starIcon from '../../assets/images/icons/star.svg';
import ActionButton from '../ActionButton';

class Star extends Component {

	render() {
		const { star } = this.props;
		return (
			<div className="action-button-wrap">
				<ActionButton icon={starIcon} action={this.props.onClick} value={star ? 'Unstar' : 'Star'} />
				<div className="action-label">{this.props.countStar}</div>
			</div>
		);
	}

}

Star.propTypes = {
	star: PropTypes.bool,
	countStar: PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

Star.defaultProps = {
	star: false,
	countStar: 0,
};

export default Star;
