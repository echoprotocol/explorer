import React from 'react';
import PropTypes from 'prop-types';
import ErcInfoBlock from './ErcInfoBlock';

import TransfersTable from '../TransfersTable';


const ErcInfo = ({
	countTokenTransfer, token, tokenTransfers, router,
	filterAndPaginateData, initData, onLoadMoreHistory,
}) => (
	<React.Fragment>
		<ErcInfoBlock data={token} countTransfers={countTokenTransfer} />
		<TransfersTable
			label="Transfers"
			tokenTransfers={tokenTransfers}
			coin={token && token.symbol}
			onLoadMoreHistory={onLoadMoreHistory}
			initData={initData}
			filterAndPaginateData={filterAndPaginateData}
			router={router}
		/>
	</React.Fragment>
);

ErcInfo.propTypes = {
	countTokenTransfer: PropTypes.number.isRequired,
	token: PropTypes.object,
	tokenTransfers: PropTypes.array,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	onLoadMoreHistory: PropTypes.func.isRequired,
	router: PropTypes.object.isRequired,
};

ErcInfo.defaultProps = {
	token: {},
	tokenTransfers: [],
};

export default ErcInfo;
