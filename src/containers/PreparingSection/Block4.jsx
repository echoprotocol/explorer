
import React from 'react';
import { LineChart, Line } from 'recharts';
import Media from 'react-media';

import { OperationsBlockIcon } from '../../components/Icons/HeaderIcons';

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

const getChartWidth = (queries) => {
	const keys = Object.keys(queries);

	const query = keys.filter((key) => queries[key]).slice(-1)[0];

	switch (query) {
		case 'hd':
			return 300;
		case 'lg':
			return 190;
		case 'md':
			return 150;
		case 'sm':
			return 190;
		default:
			return 190;
	}
};
const Block4 = React.memo(() => (
	<React.Fragment>
		<div className="preparing-head">
			<OperationsBlockIcon />
			<span className="preparing-caption accent">3,456</span>
			<Media queries={{
				hd: '(max-width: 1280px)',
				lg: '(max-width: 1000px)',
				md: '(max-width: 768px)',
				sm: '(max-width: 500px)',
			}}
			>
				{(matches) => (
					<div className="preparing-chart">
						<LineChart
							width={getChartWidth({ hd: matches.hd, lg: matches.lg, md: matches.md })}
							height={20}
							data={data}
						>
							<Line
								dot={false}
								isAnimationActive={false}
								type="monotone"
								dataKey="uv"
								stroke="#2995D8"
							/>
						</LineChart>
					</div>
				)}
			</Media>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Operations (last 7 days)</span>
		</div>
	</React.Fragment>
));

export default Block4;

