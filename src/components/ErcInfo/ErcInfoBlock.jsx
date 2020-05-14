import React from 'react';
import PropTypes from 'prop-types';

const ErcInfoBlock = React.memo(({ data, countTransfers }) => (
	<div className="erc-info-block">
		<div className="erc-info-block__item symbol">
			<div className="erc-info-block__item-title">Token symbol (name)</div>
			<div className="erc-info-block__item-value">
				{data.symbol} ({data.name && data.name.length > 7 ? `${data.name.substring(0, 7)}...` : data.name})
			</div>
		</div>
		<div className="erc-info-block__item decimals">
			<div className="erc-info-block__item-title">Decimals</div>
			<div className="erc-info-block__item-value">{data.decimals}</div>
		</div>
		<div className="erc-info-block__item supply">
			<div className="erc-info-block__item-title">Total supply</div>
			<div className="erc-info-block__item-value">
				<span className="half">{data.total_supply}</span>
			</div>
		</div>
		<div className="erc-info-block__item holders">
			<div className="erc-info-block__item-title">Holders</div>
			<div className="erc-info-block__item-value">{data.holders_count} address{data.holders_count > 1 ? 'es' : ''}</div>
		</div>
		<div className="erc-info-block__item transfers">
			<div className="erc-info-block__item-title">Transfers</div>
			<div className="erc-info-block__item-value">{countTransfers}</div>
		</div>
	</div>
));

ErcInfoBlock.propTypes = {
	countTransfers: PropTypes.number.isRequired,
	data: PropTypes.object,
};

ErcInfoBlock.defaultProps = {
	data: {},
};

export default ErcInfoBlock;
