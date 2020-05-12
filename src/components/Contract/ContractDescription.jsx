import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { NONE_SYMBOL } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import Avatar from '../Avatar';


import URLHelper from '../../helpers/URLHelper';
import { SSR_ACCOUNTS_PATH, SSR_BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';

class ContractDescription extends React.Component {

	render() {
		const { data } = this.props;
		let date = NONE_SYMBOL;
		let time = '';
		if (!data.get('error')) {
			const contractCreationTime = FormatHelper.timestampToContractCreationTime(data.get('createdAt'));
			({ date, time } = contractCreationTime);
		}
		return (
			<React.Fragment>
				<div className="created-info">
					<div className="created-info-details">
						<span>Created&nbsp;</span>
						<Link
							href={SSR_BLOCK_INFORMATION_PATH}
							as={URLHelper.createBlockUrl(data.get('blockNumber'))}
						>
							<a className="link created-info__date">{date}{time}&nbsp;</a>
						</Link>
						<span style={{ color: '#828B95' }}>by &nbsp;</span>
						<span className="created-info__account">
							<Avatar accountName={data.getIn(['owner', 'name'])} />
							<Link href={SSR_ACCOUNTS_PATH} as={URLHelper.createAccountUrl(data.getIn(['owner', 'name']))} >
								<a className="link">{data.getIn(['owner', 'name'])}</a>
							</Link>
						</span>
					</div>
					{data.get('description') && (
						<div className="created-info__description">
							{data.get('description')}
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}

}

ContractDescription.propTypes = {
	data: PropTypes.object.isRequired,
};

ContractDescription.defaultProps = {};

export default ContractDescription;
