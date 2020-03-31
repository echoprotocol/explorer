import React from 'react';

import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

let CodeMirror = null;
if (typeof window !== 'undefined') {
	/* eslint-disable global-require */
	({ Controlled: CodeMirror } = require('react-codemirror2'));
	require('codemirror/mode/xml/xml.js');
	require('codemirror/mode/javascript/javascript.js');
	/* eslint-enable global-require */
}

class ContractSourceCode extends React.Component {

	render() {
		const { sourceCode } = this.props;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		return (
			<div className="contract-source-code-panel">

				<div className="line">
					<div className="action-button-wrap">
						<button className="action-button" onClick={() => copy(sourceCode)}>Copy code</button>
					</div>
				</div>

				<div className="code-block max-height-none">
					{CodeMirror && (
						<CodeMirror
							value={sourceCode}
							options={CODEMIRROR_OPTIONS}
						/>
					)}

				</div>

			</div>
		);
	}

}

ContractSourceCode.propTypes = {
	sourceCode: PropTypes.string,
};

ContractSourceCode.defaultProps = {
	sourceCode: null,
};

export default ContractSourceCode;
