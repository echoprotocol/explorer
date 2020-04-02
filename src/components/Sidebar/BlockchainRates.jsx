import React from 'react';
import { LineChart, Line } from 'recharts';
import InfoTooltip from '../../components/InfoTooltip';

const data = [
	{
		name: '0', uv: 4000, pv: 2400, amt: 2400,
	}, {
		name: '1', uv: 2000, pv: 9800, amt: 2290,
	}, {
		name: '2', uv: 1890, pv: 4800, amt: 2181,
	}, {
		name: '3', uv: 4000, pv: 2400, amt: 2400,
	}, {
		name: '4', uv: 2000, pv: 9800, amt: 2290,
	}, {
		name: '5', uv: 1890, pv: 4800, amt: 2181,
	},	{
		name: '6', uv: 1890, pv: 4800, amt: 2181,
	}, {
		name: '7', uv: 4000, pv: 2400, amt: 2400,
	}, {
		name: '8', uv: 2000, pv: 9800, amt: 2290,
	}, {
		name: '9', uv: 1890, pv: 4800, amt: 2181,
	},
];
const BlockchainRates = () => (
	<div className="blockchain-rates-wrap">
		<div className="blockchain-rates-block">
			<div className="blockchain-rates-block-title">
				Delegation rate
				<InfoTooltip overlay="Delegation rate information" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">35%</div>

				<LineChart width={135} height={20} data={data} className="preview-chart">
					<Line dot={false} type="monotone" dataKey="uv" stroke="#2995D8" />
				</LineChart>
			</div>
		</div>
	</div>
);

export default BlockchainRates;
