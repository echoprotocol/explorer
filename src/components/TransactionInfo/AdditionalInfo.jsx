import React from 'react';
import PropTypes from 'prop-types';

import OperationInfoRow from './OperationInfoRow';

const AdditionalInfo = ({ data }) => (
	<div className="additional-info">
		<div className="additional-info__title">Additional info</div>
		{data.account_white_list && <OperationInfoRow title="Account white list" description={data.account_white_list} />}
		{data.account_black_list && <OperationInfoRow title="Account black list" description={data.account_black_list} />}
	</div>
);

AdditionalInfo.propTypes = {
	data: PropTypes.object,
};

AdditionalInfo.defaultProps = {
	data: {},
};

export default AdditionalInfo;
