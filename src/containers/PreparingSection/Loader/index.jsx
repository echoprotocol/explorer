import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {

	constructor(props) {
		super(props);

		this.bar = React.createRef();
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.status && this.props.status > nextProps.status) {
			if (this.bar) {
				const classes = this.bar.classList;
				classes.remove('transition');
			}
		} else if (this.props.status === 5) {
			if (this.bar) {
				const classes = this.bar.classList;
				if (classes.contains('transition')) {
					return false;
				}
				classes.add('transition');
			}
		}
		return true;
	}

	render() {

		const { status } = this.props;
		return (
			<div className="preparing-loader">
				<div ref={(el) => { this.bar = el; }} className="line transition" style={{ width: `${status}%` }} />
			</div>
		);
	}

}

Loader.propTypes = {
	status: PropTypes.number,
};

Loader.defaultProps = {
	status: '',
};


export default Loader;
