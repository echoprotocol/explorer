import React from 'react';
import PropTypes from 'prop-types';

const ErcInfoBlock = React.memo(({ data }) => (
	<div className="erc-info-block">
		<div className="erc-info-block__item symbol">
			<div className="erc-info-block__item-title">Token symbol (name)</div>
			<div className="erc-info-block__item-value">{data.token_symbol}</div>
		</div>
		<div className="erc-info-block__item decimals">
			<div className="erc-info-block__item-title">Decimals</div>
			<div className="erc-info-block__item-value">{data.decimals}</div>
		</div>
		<div className="erc-info-block__item supply">
			<div className="erc-info-block__item-title">Current supply (total supply)</div>
			<div className="erc-info-block__item-value">
				<span className="half">{data.current_supply}</span>
				(<span className="half">{data.total_supply}</span>)
			</div>
		</div>
		<div className="erc-info-block__item holders">
			<div className="erc-info-block__item-title">Holders</div>
			<div className="erc-info-block__item-value">{data.holders} addresses</div>
		</div>
		<div className="erc-info-block__item transfers">
			<div className="erc-info-block__item-title">Transfers</div>
			<div className="erc-info-block__item-value">{data.transfers}</div>
		</div>
	</div>
));

ErcInfoBlock.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ErcInfoBlock;
