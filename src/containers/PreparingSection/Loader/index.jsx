import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loader extends React.Component {

	render() {

		const { status, transparent } = this.props;

		return (
			<div className="preparing-loader">
				<div className={classnames('line', { transparent })} style={{ width: `${status}%` }} />
			</div>
		);
	}

}

Loader.propTypes = {
	status: PropTypes.number,
	transparent: PropTypes.bool,
};

Loader.defaultProps = {
	status: '',
	transparent: false,
};


export default Loader;
