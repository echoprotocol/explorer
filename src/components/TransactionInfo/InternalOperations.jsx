import React from 'react';
import PropTypes from 'prop-types';

import PrimaryRow from './Rows/PrimaryRow';
import LinkRow from './Rows/LinkRow';
import CopyRow from './Rows/CopyRow';

import FormatHelper from '../../helpers/FormatHelper';

const InternalOperations = ({ operations }) => (
	<React.Fragment>
		{operations.map(({ operationInfo }, id) => (
			<div className="internal-operation" key={operationInfo.type}>
				<div className="internal-operation__title">{id + 1}.&nbsp;{operationInfo.type}</div>
				<div className="internal-operation__rows">
					{operationInfo.contract_id && <LinkRow title="Contract id" link={operationInfo.contract_id} className="sm" />}
					{operationInfo.asset_amount_sent &&
					<PrimaryRow
						className="sm"
						title="Asset amount sent"
						description={FormatHelper.formatAmount(operationInfo.asset_amount_sent.amount, operationInfo.asset_amount_sent.precision, operationInfo.asset_amount_sent.symbol)}
					/>}
					{operationInfo.bytecode && <CopyRow title="Call method" value={operationInfo.bytecode} className="sm" />}
				</div>
			</div>
		))}
	</React.Fragment>
);

InternalOperations.propTypes = {
	operations: PropTypes.array.isRequired,
};

export default InternalOperations;
