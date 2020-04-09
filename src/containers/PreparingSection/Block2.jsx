/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';

class Block2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			time: props.diff,
		};
		const timerId = setInterval(() => {
			const { time } = this.state;
			this.setState({ time: time + 1 });
		}, 1000);
		this.state.timerId = timerId;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.diff !== this.props.diff) {
			clearInterval(prevState.timerId);
			this.setState({ time: this.props.diff });
			const timerId = setInterval(() => {
				const { time } = this.state;
				this.setState({ time: time + 1 });
			}, 1000);
			this.setState({ timerId });
		}
	}

	render() {
		const { time } = this.state;
		return (
			<React.Fragment>
				<div className="preparing-head">
					<LatestBlockIcon />
					<span className="preparing-caption">
						<span className="accent">
							{Math.floor(time / 60 / 60)}h
						</span>
						: {Math.floor((time / 60) % 60)}m : {Math.floor(time % 60)}s
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
