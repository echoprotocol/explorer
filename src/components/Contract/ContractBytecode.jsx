import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

class ContractBytecode extends React.Component {

	render() {
		const { bytecode } = this.props;

		return (
			<div className="contract-bytecode-panel">
				<div className="row">
					<div className="right-column">
						{
							bytecode ?
								<React.Fragment>
									<button className="copy-bytecode" onClick={() => copy(bytecode)}>Copy code</button>
									<div className="text-block">{bytecode}</div>
								</React.Fragment> :
								<div className="text-block">None</div>
						}
					</div>
				</div>
			</div>
		);
	}

}

ContractBytecode.propTypes = {
	bytecode: PropTypes.string,
};

ContractBytecode.defaultProps = {
	bytecode: null,
};

export default ContractBytecode;
