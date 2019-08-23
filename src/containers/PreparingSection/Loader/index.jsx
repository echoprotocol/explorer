import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {

	shouldComponentUpdate(nextProps) {
		const { status, executeTime } = this.props;
		const { status: nextStatus, executeTime: nextExecuteTime } = nextProps;

		if ((status === nextStatus) && (executeTime === nextExecuteTime)) {
			return false;
		}

		return true;

	}

	render() {
		const { status, executeTime } = this.props;

		const style = { width: `${status}%` };

		if (status !== 0) {
			style.transition = `width ${executeTime}s`;
		}

		return (
			<div className="preparing-loader">
				<div className="line" style={style} />
			</div>
		);
	}

}

Loader.propTypes = {
	status: PropTypes.number,
	executeTime: PropTypes.number,
};

Loader.defaultProps = {
	status: '',
	executeTime: 0,
};


export default Loader;
