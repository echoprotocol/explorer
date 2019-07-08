import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class ContractSourceCode extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.value !== prevState.value) {
			return ({
				value: nextProps.value,
			});
		}
		return null;
	}


	render() {
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		return (
			<div className="contract-source-code-panel">

				<div className="line">
					<div className="action-button-wrap">
						<button className="action-button">Copy code</button>
					</div>
				</div>

				<div className="code-block">
					<CodeMirror
						value={this.state.value}
						options={CODEMIRROR_OPTIONS}
						onBeforeChange={(editor, data, value) => {
							this.setState({ value });
						}}
					/>
				</div>

			</div>
		);
	}

}

ContractSourceCode.propTypes = {
	// eslint-disable-next-line react/no-unused-prop-types
	value: PropTypes.string,
};

ContractSourceCode.defaultProps = {
	value: '',
};

export default ContractSourceCode;
