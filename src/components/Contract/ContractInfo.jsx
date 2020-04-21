import React from 'react';
import PropTypes from 'prop-types';
import ContractInfoBlock from './ContractInfoBlock';
import AssetBalances from '../Account/AssetBalances';
import TokenBalances from '../Account/TokenBalances';
import ContractDescription from './ContractDescription';


class ContractInfo extends React.Component {

	render() {
		const { dataDescription, dataAssets, dataGeneral } = this.props;

		return (
			<div className="page-t-block">
				<div className="help-container">
					<ContractInfoBlock data={dataGeneral} />
					<div className="right-container">
						<ContractDescription data={dataDescription} />
						<AssetBalances title="Assets" balances={dataAssets.get('balances')} />
						<TokenBalances title="Tokens" tokens={[]} />
					</div>
				</div>
			</div>
		);
	}

}

ContractInfo.propTypes = {
	dataDescription: PropTypes.object.isRequired,
	dataAssets: PropTypes.object.isRequired,
	dataGeneral: PropTypes.object.isRequired,
};

ContractInfo.defaultProps = {};

export default ContractInfo;
