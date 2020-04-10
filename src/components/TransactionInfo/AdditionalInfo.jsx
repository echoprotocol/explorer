import React from 'react';
import PropTypes from 'prop-types';

import OperationInfoRow from './OperationInfoRow';

const AdditionalInfo = ({ data }) => (
	<div className="additional-info">
		<div className="additional-info__title">Additional info</div>
		{data.account_white_list && <OperationInfoRow title="Account white list" description={data.account_white_list} />}
		{data.account_black_list && <OperationInfoRow title="Account black list" description={data.account_black_list} />}
		{data.current_asset_feed_producers && <OperationInfoRow title="Current asset feed producers" accounts={data.current_asset_feed_producers} /> }
		{data.current_asset_total_supply && <OperationInfoRow title="Current asset total supply" description={data.current_asset_total_supply} /> }
	</div>
);

AdditionalInfo.propTypes = {
	data: PropTypes.object,
};

AdditionalInfo.defaultProps = {
	data: {},
};

export default AdditionalInfo;
