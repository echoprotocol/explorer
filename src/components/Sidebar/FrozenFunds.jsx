import React from 'react';
import { LineChart, Line } from 'recharts';
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
const FrozenFunds = () => (
	<React.Fragment>
		<div className="frozen-funds-wrap">
			<div className="sidebar-element-block">
				<div className="sidebar-element-block-title">Comitee amount</div>
				<div className="frozen-funds-block-info">
					<div className="comitee-amount">
						<div className="comitee-amount-value">1333. 33333337</div>
						<div className="comitee-amount-coin">ECHO</div>
					</div>
				</div>
			</div>
			<div className="sidebar-element-block">
				<div className="sidebar-element-block-title">Users amount</div>
				<div className="frozen-funds-block-info">
					<div className="users-amount">
						<div className="users-amount-value">1,333,234. 333</div>
						<div className="users-amount-coin">ECHO</div>
					</div>
					<LineChart
						width={SIDEBAR_CHART_WIDTH}
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
		<a href="" className="sidebar-element-link">View all Frozen funds</a>

	</React.Fragment>
);

export default FrozenFunds;
