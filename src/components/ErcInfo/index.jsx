import React from 'react';
import PropTypes from 'prop-types';
import ErcInfoBlock from './ErcInfoBlock';

import TransfersTable from '../TransfersTable';


const ErcInfo = ({ countTokenTransfer, token, tokenTransfers }) => (
	<React.Fragment>
		<ErcInfoBlock data={token} countTransfers={countTokenTransfer} />
		<TransfersTable
			label="Transfers"
			tokenTransfers={tokenTransfers}
			coin={token && token.symbol}
		/>
	</React.Fragment>
);

ErcInfo.propTypes = {
	countTokenTransfer: PropTypes.number.isRequired,
	token: PropTypes.object,
	tokenTransfers: PropTypes.array,
};

ErcInfo.defaultProps = {
	token: null,
	tokenTransfers: [],
};

export default ErcInfo;
