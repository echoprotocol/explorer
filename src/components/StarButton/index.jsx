import React, { Component } from 'react';
import PropTypes from 'prop-types';
import starIcon from '../../assets/images/icons/star.svg';

class Star extends Component {

	render() {
		const { star } = this.props;
		return (
			<div className="action-button-wrap">
				<button className="action-button">
					<img src={starIcon} alt="" />
					{
						star ?
							<React.Fragment>
								<span className="content">Start</span>
							</React.Fragment>
							:
							<React.Fragment>
								<span className="content">Unstar</span>
							</React.Fragment>
					}
				</button>
				<div className="action-label">245</div>
			</div>
		);
	}

}

Star.propTypes = {
	star: PropTypes.bool,
};

Star.defaultProps = {
	star: false,
};

export default Star;
