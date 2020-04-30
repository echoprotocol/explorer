
import React from 'react';
import { LineChart, Line } from 'recharts';
import Media from 'react-media';
import PropTypes from 'prop-types';

import { OperationsBlockIcon } from '../../components/Icons/HeaderIcons';
import FormatHelper from '../../helpers/FormatHelper';


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
const Block4 = React.memo((props) => (
	<React.Fragment>
		<div className="preparing-head">
			<OperationsBlockIcon />
			<span className="preparing-caption accent">{FormatHelper.formatAmount(props.operationCount)}</span>
			<Media queries={{
				hd: '(max-width: 1279px)',
				lg: '(max-width: 999px)',
				md: '(max-width: 767px)',
				sm: '(max-width: 499px)',
			}}
			>
				{(matches) => (
					<div className="preparing-chart">
						<LineChart
							width={getChartWidth({ hd: matches.hd, lg: matches.lg, md: matches.md })}
							height={20}
							data={props.operationCountRates}
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
				)}
			</Media>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Operations (last 30 days)</span>
		</div>
	</React.Fragment>
));

Block4.propTypes = {
	operationCountRates: PropTypes.array.isRequired,
	operationCount: PropTypes.number.isRequired,
};

export default Block4;
