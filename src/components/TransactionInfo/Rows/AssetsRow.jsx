import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from 'next/link';

import { SSR_ASSET_PATH } from '../../../constants/RouterConstants';
import URLHelper from '../../../helpers/URLHelper';
import FormatHelper from '../../../helpers/FormatHelper';

const AssetsRow = ({ title, assets }) => (
	<div className="od-row">
		<div className="od-col">{title}:</div>
		<div className="od-col">
			<div className="assets-field">
				{assets.map((item, i) => (
					<span className={cn('assets-field-item', { lg: i === 0 })} key={item.id}>
						<span className="title">{item.symbol} {i === 0 && 'Balance'}</span>
						<span className="divider" />
						<span className="value">
							<span className="amount">{FormatHelper.formatAmount(item.amount, item.precision)}&nbsp;</span>
							<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(item.asset_id)} >
								<a className="blue">{item.symbol}</a>
							</Link>
						</span>
					</span>
				))}
			</div>
		</div>
	</div>
);

AssetsRow.propTypes = {
	title: PropTypes.string.isRequired,
	assets: PropTypes.array,
};

AssetsRow.defaultProps = {
	assets: [],
};

export default memo(AssetsRow);
