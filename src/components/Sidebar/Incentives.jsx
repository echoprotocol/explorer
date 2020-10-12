import React from 'react';
import Link from 'next/link';
import { LineChart, Line } from 'recharts';

import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import { ECHO } from '../../constants/TotalSupplyConstants';

import { SSR_ASSET_PATH } from '../../constants/RouterConstants';
import URLHelper from '../../helpers/URLHelper';
import InfoTooltip from '../../components/InfoTooltip';
import { SIDEBAR_CHART_WIDTH, SIDEBAR_CHART_HEIGHT } from '../../constants/UiConstants';
import { MODAL_INCENTIVES_INFO } from '../../constants/ModalConstants';

const Incentives = ({
	pinned,
	incentiveRates,
	incentivesPool,
	incentive,
	openModal,
}) => {

	const showChart = () => {
		openModal(MODAL_INCENTIVES_INFO);
	};

	return (
		<div className="sidebar-el-wrap">
			<div className="sidebar-el">
				<div className="sidebar-element-block-title">
					Echo Treasury
					<InfoTooltip overlay="Current Echo's Reward Pool" />
				</div>
				<div className="incentive-block-info">
					<Tooltip
						placement="top"
						overlayClassName="verify-contract-tooltip"
						trigger={['hover']}
						overlay={incentivesPool}
					>
						<div className="incentives-pool-value">{incentivesPool}</div>
					</Tooltip>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO.ID)}>
						<a href="" className="incentive-coin">
							{ECHO.SYMBOL}
						</a>
					</Link>
				</div>
			</div>
			<div className="sidebar-el">
				<div className="sidebar-element-block-title">
					Reward Amplifier
					<InfoTooltip overlay="Shows staking profitability and current Echo's Reward increasing" />
				</div>
				<div className="incentive-block-info">
					<Tooltip
						placement="top"
						overlayClassName="verify-contract-tooltip"
						trigger={['hover']}
						overlay={incentive}
					>
						<div className="incentives-pool-value">{incentive}</div>
					</Tooltip>
					<Link href={SSR_ASSET_PATH} as={URLHelper.createAssetUrl(ECHO.ID)}>
						<a href="" className="incentive-coin">
							{ECHO.SYMBOL}
						</a>
					</Link>
					<div tabIndex={-1} role="button" onKeyDown={() => showChart()} onClick={() => showChart()}>
						<LineChart
							width={pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH}
							height={SIDEBAR_CHART_HEIGHT}
							data={incentiveRates}
						>
							<Line
								isAnimationActive={false}
								dot={false}
								type="monotone"
								dataKey="rate"
								stroke="#2995D8"
							/>
						</LineChart>
					</div>
				</div>
			</div>
		</div>
	);
};

Incentives.propTypes = {
	pinned: PropTypes.bool,
	incentivesPool: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	incentive: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	openModal: PropTypes.func.isRequired,
	incentiveRates: PropTypes.array.isRequired,
};

Incentives.defaultProps = {
	pinned: false,
};

export default Incentives;
