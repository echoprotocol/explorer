import React from 'react';
// import PropTypes from 'prop-types';

class ContractInfoBlock extends React.Component {

	render() {
		return (
			<div className="contract-info-block">
				<div className="line">
					<div className="key">Block:</div>
					<div className="underline" />
					<div className="value blue">1 345 903</div>
				</div>
				<div className="line">
					<div className="key">Creation FEE:</div>
					<div className="underline" />
					<div className="value">1.59232 ECHO</div>
				</div>
				<div className="line">
					<div className="key">Type:</div>
					<div className="underline" />
					<div className="value">EVM, ERC20</div>
				</div>
				<div className="line">
					<div className="key">Contract txs:</div>
					<div className="underline" />
					<div className="value">37</div>
				</div>
				<div className="line">
					<div className="key">Used by accounts:</div>
					<div className="underline" />
					<div className="value">3</div>
				</div>
				<div className="line">
					<div className="key">Supported assets:</div>
					<div className="underline" />
					<div className="value">All</div>
				</div>
				<div className="line">
					<div className="key">Eth accuracy:</div>
					<div className="underline" />
					<div className="value">Active</div>
				</div>
				<div className="line">
					<div className="key">Compiler version:</div>
					<div className="underline" />
					<div className="value">234.45-45</div>
				</div>
			</div>
		);
	}

}

ContractInfoBlock.propTypes = {};

ContractInfoBlock.defaultProps = {};

export default ContractInfoBlock;
