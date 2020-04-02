import React from 'react';
import { TotalSupplyIcon } from '../../components/Icons/TotalSupplyIcon';

const TotalSupply = () => (
	<React.Fragment>
		<div className="total-supply">
			<TotalSupplyIcon />
			<div className="total-supply-value">
				3,440,012,300,233,310,342. 00kokoko
			</div>
			<div className="total-supply-coin">ECHO</div>
		</div>
		<a href="" className="total-supply-link">View all Assets</a>
	</React.Fragment>
);

export default TotalSupply;
