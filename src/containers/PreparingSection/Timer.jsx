

/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {

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
				<span className="accent">
					{Math.floor(time / 60 / 60)}h
				</span>
				: {Math.floor((time / 60) % 60)}m : {Math.floor(time % 60)}s
			</React.Fragment>
		);
	}

}

Timer.propTypes = {
	diff: PropTypes.number.isRequired,
};

export default Timer;
