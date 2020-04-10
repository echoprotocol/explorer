

/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeFace from './TimeFace';

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
				<TimeFace time={time * 1000} />
			</React.Fragment>
		);
	}

}

Timer.propTypes = {
	diff: PropTypes.number.isRequired,
};

export default Timer;
