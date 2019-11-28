import React from 'react';
import PropTypes from 'prop-types';

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
