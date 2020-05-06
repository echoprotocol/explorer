import React from 'react';
import ErcInfoBlock from './ErcInfoBlock';

import TransfersTable from '../TransfersTable';

const infoBlockData = {
	token_symbol: 'Test (test token)',
	decimals: 18,
	current_supply: '21 000 000.0000000000',
	total_supply: '90 000 000.0000000000',
	holders: 43,
	transfers: 323,
};

const ErcInfo = () => (
	<React.Fragment>
		<ErcInfoBlock data={infoBlockData} />
		<TransfersTable label="Transfers" />
	</React.Fragment>
);

export default ErcInfo;
