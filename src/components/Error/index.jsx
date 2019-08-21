import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Logotype from '../../components/Logotype';

class BaseErrorComponent extends React.Component {

	render() {
		const {
			titlePage, description, titleButton, typeError,
		} = this.props;

		return (
			<div className={classnames('not-found-page', typeError)}>
				<div className="logo-container"><Logotype onClick={() => this.props.onHandler()} /></div>
				<div className="container">
					<div className="img" />
					<div className="txt-block">
						<div className="title">{titlePage}</div>
						{description && <div className="desc">{description}</div>}
						<button className="n-f-button" onClick={() => this.props.onHandler()}>{titleButton}</button>
					</div>
				</div>
			</div>
		);
	}

}

BaseErrorComponent.propTypes = {
	description: PropTypes.string,
	typeError: PropTypes.string,
	titlePage: PropTypes.string.isRequired,
	titleButton: PropTypes.string.isRequired,
	onHandler: PropTypes.func.isRequired,
};

BaseErrorComponent.defaultProps = {
	description: '',
	typeError: '',
};

export default BaseErrorComponent;
