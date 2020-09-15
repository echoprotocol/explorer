import React, { memo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

import TableLabel from '../TableLabel';

import FormatHelper from '../../helpers/FormatHelper';

const AssetGraphic = ({ data, label, precision }) => {

	const lineRef = useRef();
	const [resolution, setResolution] = useState(1920);

	const updateResolution = () => {
		setResolution(window.innerWidth);
	};

	useEffect(() => {
		updateResolution();
		window.addEventListener('resize', updateResolution);
		return () => window.removeEventListener('resize', updateResolution);
	});

	const cutYAxisValue = (value, precis) => {
		const [firstPart, secondPart] = value.split('.');

		if (Math.ceil(+secondPart) === 0) {
			return `${firstPart}.0`;
		}

		if (+firstPart === 0 && Math.ceil(+secondPart) === 0) {
			return firstPart;
		}

		return secondPart.length > precis ? `${firstPart}.${secondPart.slice(0, precis)}..` : value;
	};

	const CustomTooltip = (tooltipData) => {
		const yTooltipRef = useRef();
		const yToolTipAlignment = yTooltipRef.current && yTooltipRef.current.clientWidth <= 52 ? 'left' : 'right';

		const points = lineRef.current ? lineRef.current.props.points : null;
		const chartHeight = lineRef.current ? lineRef.current.props.height : null;
		let activePoint = null;
		if (tooltipData.active) {
			activePoint = points.find((item) => item.payload.date === tooltipData.label);
			return (
				<React.Fragment>
					<div
						className={cn('y-tooltip', yToolTipAlignment)}
						ref={yTooltipRef}
						style={{
							position: 'absolute',
							left: yToolTipAlignment === 'left' ? '0' : '66px',
							// activepoint.y + 0.5*tooltipHeight
							top: `${activePoint.y - 11}px`,
						}}
					>
						{tooltipData && FormatHelper.formatAmount(tooltipData.payload[0].payload.price, precision)}
					</div>
					<div
						className="x-tooltip"
						style={{
							position: 'absolute',
							// height of the chart + tooltop-triangle height
							top: `${chartHeight + 6}px`,
							// activePoint + tooltipWidth/2
							left: `${activePoint.x - 40}px`,
						}}
					>{tooltipData && tooltipData.payload[0].payload.date}
					</div>
					<div
						className="y-cursor"
						style={{
							position: 'absolute',
							left: '60px',
							width: `${activePoint.x - 60}px`,
							top: `${activePoint.y}px`,
						}}
					/>
					<div
						className="x-cursor"
						style={{
							position: 'relative',
							top: `${activePoint.y}px`,
							left: `${activePoint.x}px`,
							height: `${chartHeight - activePoint.y}px`,
						}}
					/>
				</React.Fragment>
			);
		}
		return null;
	};

	return (
		<React.Fragment>
			{label && <TableLabel label={label} /> }
			<div className="asset-graphic">
				<ResponsiveContainer width={resolution < 1000 ? '99%' : '96%'} height={265}>
					<LineChart
						data={data}
						margin={{
							top: 0, right: 0, left: 0, bottom: 0,
						}}
					>
						<CartesianGrid stroke="#E9EAEF" />
						<XAxis
							dataKey="date"
							tickMargin={10}
							height={40}
							interval="preserveStartEnd"
						/>
						<YAxis
							dataKey="price"
							type="number"
							tickSize={15}
							tickMargin={resolution < 1000 ? 50 : 85}
							tickFormatter={(tick) => cutYAxisValue(FormatHelper.formatAmount(tick, precision), 2)}
						/>
						<Tooltip
							content={<CustomTooltip />}
							position={{ y: 0, x: 0 }}
							cursor={false}
						/>
						<Line
							type="monotone"
							dataKey="price"
							stroke="#2995D8"
							strokeWidth={3}
							fill="#8884d8"
							dot={false}
							activeDot={false}
							ref={lineRef}
						/>
						<Brush
							height={60}
							stroke="#CCCCD4"
							fill="#f3f2f5"
							startIndex={1}
							travellerWidth={1}
							leaveTimeOut={0}
							padding={{
								bottom: 0, left: 0, right: 0, top: 0,
							}}
						>
							<LineChart>
								<Line type="monotone" dataKey="price" stroke="#CCCCD4" dot={false} />
							</LineChart>
						</Brush>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</React.Fragment>
	);
};

AssetGraphic.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.string,
	precision: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AssetGraphic.defaultProps = {
	label: '',
	precision: 0,
};

export default memo(AssetGraphic);
