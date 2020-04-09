import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';
import Timer from './Timer';

class Block2 extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="preparing-head">
					<LatestBlockIcon />
					<span className="preparing-caption">
						<Timer
							diff={this.props.diff}
						/>
					</span>
				</div>
				<div className="preparing-line">
					<span className="preparing-text">Latest block time</span>
				</div>
			</React.Fragment>
		);
	}

}

Block2.propTypes = {
	diff: PropTypes.number.isRequired,
};

export default Block2;
