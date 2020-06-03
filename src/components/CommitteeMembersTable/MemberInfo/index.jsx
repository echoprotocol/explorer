import React from 'react';
import PropTypes from 'prop-types';

import LinkRow from '../../TransactionInfo/Rows/LinkRow';
import AssetsRow from '../../TransactionInfo/Rows/AssetsRow';
import FromatHelper from '../../../helpers/FormatHelper';

class MembersInfo extends React.Component {

	render() {
		const { data } = this.props;
		return (
			<div className="row-info">
				<div className="table-detail-rows">
					{data.assets && <AssetsRow title="Member assets" assets={data.assets} />}
					{data.frozenBalance && <LinkRow title="Frozen balance" amount={data.frozenBalance} />}
					{data.website && <LinkRow title="Website" link={FromatHelper.addExternalProtocolToLink(data.website)} value={data.website} isLinkOut />}
				</div>
			</div>
		);
	}

}


MembersInfo.propTypes = {
	data: PropTypes.object,
};

MembersInfo.defaultProps = {
	data: {},
};
export default MembersInfo;
