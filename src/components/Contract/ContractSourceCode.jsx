import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

const CodeMirror = dynamic(() => import('../CodeMirror').then((component) => component.Controlled), {
	ssr: false,
});

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
					<CodeMirror
						value={sourceCode}
						options={CODEMIRROR_OPTIONS}
					/>
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
