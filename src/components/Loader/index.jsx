import React, { Component } from 'react';

class Loader extends Component {

	constructor(props) {
		super(props);
		this.state = { };
	}
	render() {
		return (
			<div className="f-h-loader">
				<div className="spin" />
				<div className="text">Please wait while data is loading</div>
			</div>
		);
	}

}

export default Loader;
