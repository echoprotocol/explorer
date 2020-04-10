import React from 'react';
import { LineChart, Line } from 'recharts';
import PropTypes from 'prop-types';
import InfoTooltip from '../../components/InfoTooltip';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';

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

const BlockchainRates = ({ pinned, delegationRate, delegationRates }) => (
	<div className="blockchain-rates-wrap">
		<div className="sidebar-element-block">
			<div className="sidebar-element-block-title">
				Delegation rate
				<InfoTooltip overlay="Delegation rate information" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">{delegationRate}%</div>
				<LineChart
					width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
					height={SIDEBAR_CHART_HEIGHT}
					data={delegationRates}
				>
					<Line
						dot={false}
						isAnimationActive={false}
						type="monotone"
						dataKey="rate"
						stroke="#2995D8"
					/>
				</LineChart>
			</div>
		</div>
		<div className="sidebar-element-block">
			<div className="sidebar-element-block-title">
				Decentralisation rate
				<InfoTooltip overlay="Decentralisation rate information" />
			</div>
			<div className="blockchain-rates-block-info">
				<div className="blockchain-rates-block-percent">0.03%</div>

				<LineChart
					width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
					height={SIDEBAR_CHART_HEIGHT}
					data={data}
				>
					<Line
						isAnimationActive={false}
						dot={false}
						type="monotone"
						dataKey="uv"
						stroke="#2995D8"
					/>
				</LineChart>
			</div>
		</div>
	</div>
);

BlockchainRates.propTypes = {
	pinned: PropTypes.bool.isRequired,
	delegationRate: PropTypes.number.isRequired,
	delegationRates: PropTypes.array.isRequired,
};


export default BlockchainRates;
