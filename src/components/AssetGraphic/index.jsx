import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer } from 'recharts';

const AssetGraphic = ({ data }) => {

	const lineRef = useRef();

	const CustomTooltip = (tooltipData) => {
		const points = lineRef.current ? lineRef.current.props.points : null;
		const chartHeight = lineRef.current ? lineRef.current.props.height : null;
		let activePoint = null;
		if (tooltipData.active) {
			activePoint = points.find((item) => item.payload.date === tooltipData.label);
			return (
				<React.Fragment>
					<div
						className="y-tooltip"
						style={{
							position: 'relative',
							left: '0px',
							top: `${activePoint.y - 8}px`,
						}}
					>
						{tooltipData && tooltipData.payload[0].payload.price}
					</div>
					<div
						className="x-tooltip"
						style={{
							position: 'relative',
							top: `${chartHeight - 13}px`,
							left: `${activePoint.x - 40}px`,
						}}
					>{tooltipData && tooltipData.payload[0].payload.date}
					</div>
					<div
						className="y-cursor"
						style={{
							position: 'relative',
							left: '60px',
							width: `${activePoint.x - 60}px`,
							top: `${activePoint.y - 40}px`,
						}}
					/>
					<div
						className="x-cursor"
						style={{
							position: 'relative',
							top: `${activePoint.y - 40}px`,
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
		<div className="asset-graphic">
			<ResponsiveContainer width="96%" height={265}>
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
					/>
					<YAxis
						dataKey="price"
						type="number"
						tickMargin={65}
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
						travellerWidth={5}
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
	);
};

AssetGraphic.propTypes = {
	data: PropTypes.array.isRequired,
};

export default memo(AssetGraphic);
