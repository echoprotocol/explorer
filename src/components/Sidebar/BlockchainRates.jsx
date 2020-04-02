import React from 'react';
import InfoTooltip from '../../components/InfoTooltip';

const BlockchainRates = () => (
	<div className="blockchain-rates-wrap">
		<div className="blockchain-rates-block">
			<div className="blockchain-rates-block-title">
				Delegation rate
				<InfoTooltip overlay="Delegation rate information" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">35%</div>
			</div>
		</div>
	</div>
);

export default BlockchainRates;
