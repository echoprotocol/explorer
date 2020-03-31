import React, { Component } from 'react';
import PropTypes from 'prop-types';
import starIcon from '../../public/images/icons/star.svg';

class Star extends Component {

	render() {
		const { star } = this.props;
		return (
			<div className="action-button-wrap">
				<button className="action-button start" onClick={this.props.onClick}>
					<img src={starIcon} alt="" />
					{
						star ?
							<span className="content">Unstar</span>
							:
							<span className="content">Star</span>
					}
				</button>
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
