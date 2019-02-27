import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SimplePreparingBlock from './PreparingBlock/SimplePreparingBlock';
import CompositePreparingBlock from './PreparingBlock/CompositePreparingBlock';
import Loader from './Loader';

import {
	BBA_STARTED,
	BBA_TIP,
	GC_TIP,
	ROUND_STARTED,
	GC_STARTED,
	DONE,
	PRODUCING_TIP,
	rounderSteps,
	MIN_PERCENT_PROGRESS_BAR,
	MAX_PERCENT_PROGRESS_BAR,
	PROGRESS_BAR_STEP_RANGE,
	PROGRESS_BAR_END_DELAY,
	SET_VERIFYING_STATUS_DELAY,
	PROGRESS_BAR_START_DELAY,
	AVERAGE_TIME,
	MS,
	PROGRESS_STATUS,
	DONE_STATUS,
} from '../../constants/RoundConstants';

import FormatHelper from '../../helpers/FormatHelper';

class PreparingSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progressBar: MIN_PERCENT_PROGRESS_BAR,
			status: MIN_PERCENT_PROGRESS_BAR,
			producing: PROGRESS_STATUS,
			verifyingGC: PROGRESS_STATUS,
			verifyingBBA: PROGRESS_STATUS,
		};
		this.progressInterval = null;
		this.producingTimeout = null;
		this.verifyingGCTimeout = null;
		this.pverifyingBBATimeout = null;
	}

	componentDidMount() {
		const { averageBlockTime } = this.props;
		this.startProgressBar(averageBlockTime && averageBlockTime * MS);
	}

	shouldComponentUpdate(nextProps) {
		const { stepProgress, averageBlockTime } = this.props;

		if (stepProgress && nextProps.stepProgress !== stepProgress) {
			if (
				(nextProps.stepProgress === ROUND_STARTED)
			) {
				this.resetProgressBar();
				this.startProgressBar(averageBlockTime && averageBlockTime * MS);
			} else if (
				(nextProps.stepProgress === GC_STARTED)
			) {
				this.setProducingWithDelay(DONE_STATUS);
			} else if (
				(rounderSteps[nextProps.stepProgress].step === rounderSteps[DONE].step)
			) {
				this.setVerifyingGCWithDelay(DONE_STATUS);
			}
		}

		return true;
	}

	setProducingWithDelay(status, delay = SET_VERIFYING_STATUS_DELAY) {
		this.producingTimeout = setTimeout(() => this.setState({ producing: status }), delay);
	}

	setVerifyingGCWithDelay(status, delay = SET_VERIFYING_STATUS_DELAY) {
		this.verifyingGCTimeout = setTimeout(() => this.setState({ verifyingGC: status }), delay);
		this.setVerifyingBBAWithDelay(DONE_STATUS);
	}

	setVerifyingBBAWithDelay(status, delay = SET_VERIFYING_STATUS_DELAY) {
		this.verifyingBBATimeout = setTimeout(() => this.setState({ verifyingBBA: status }), delay);
	}

	startProgressBar(averageBlockTime = AVERAGE_TIME) {
		averageBlockTime -= PROGRESS_BAR_END_DELAY * MS;
		setTimeout(() => {
			this.setState(() => ({ progressBar: MAX_PERCENT_PROGRESS_BAR }));
		}, PROGRESS_BAR_START_DELAY);

		const intervalPeriods = averageBlockTime / (MAX_PERCENT_PROGRESS_BAR / PROGRESS_BAR_STEP_RANGE);

		this.progressInterval = setInterval(() => {
			if (this.state.status < MAX_PERCENT_PROGRESS_BAR) {
				this.setState({ status: this.state.status += PROGRESS_BAR_STEP_RANGE });
			} else {
				clearInterval(this.progressInterval);
			}
		}, intervalPeriods);

	}

	resetProgressBar() {
		clearInterval(this.progressInterval);
		clearInterval(this.producingTimeout);
		clearInterval(this.verifyingGCTimeout);
		clearInterval(this.verifyingBBATimeout);
		this.setState(() => ({
			progressBar: MIN_PERCENT_PROGRESS_BAR,
			status: MIN_PERCENT_PROGRESS_BAR,
			producing: PROGRESS_STATUS,
			verifyingGC: PROGRESS_STATUS,
			verifyingBBA: PROGRESS_STATUS,
		}));
	}

	render() {
		const {
			producers, stepProgress, readyProducers, preparingBlock, averageBlockTime,
		} = this.props;

		const {
			progressBar, producing, verifyingGC, verifyingBBA, status,
		} = this.state;

		if (!stepProgress) {
			return null;
		}

		return (
			<React.Fragment>
				<div className="wrap">
					<div className="preparing-section">
						<Media query="(max-width: 499px)">
							{(matches) =>
								(matches ? (
									<p className="mobile-title">Preparing block</p>
								) : (
									<SimplePreparingBlock title="Preparing block" description={FormatHelper.formatAmount(preparingBlock, 0)} />
								))
							}
						</Media>

						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<CompositePreparingBlock
										composite
										title={rounderSteps[stepProgress].title}
										currentStep={rounderSteps[stepProgress].step}
										totalStep={rounderSteps.totalStep}
										description={`Producers: ${readyProducers}/${producers}`}
										status={producing === DONE_STATUS && status >= rounderSteps[GC_STARTED].progress ? producing : PROGRESS_STATUS}
										tooltip
									/>
								) : (
									<React.Fragment>
										<SimplePreparingBlock
											title="Producing block"
											description={`Producers: ${readyProducers}/${producers}`}
											status={producing === DONE_STATUS && status >= rounderSteps[GC_STARTED].progress ? producing : PROGRESS_STATUS}
											tooltip
											tip={PRODUCING_TIP}
										/>
										<SimplePreparingBlock
											className="sm-border"
											title="Verifying block: GC"
											smallTitle="Verifying: GC"
											description="Verifying"
											stat
											us={rounderSteps[stepProgress].verifying}
											status={verifyingGC === DONE_STATUS && status >= rounderSteps[DONE].progress ? verifyingGC : PROGRESS_STATUS}
											tooltip
											tip={GC_TIP}
										/>
										<SimplePreparingBlock
											tip={BBA_TIP}
											title="Verifying block: BBA"
											smallTitle="Verifying: BBA"
											description="Pending"
											status={verifyingBBA === DONE_STATUS && status >= rounderSteps[BBA_STARTED].maxProgress ? verifyingBBA : PROGRESS_STATUS}
											tooltip
										/>
									</React.Fragment>
								))
							}
						</Media>
					</div>
				</div>
				<Loader status={progressBar} executeTime={averageBlockTime - PROGRESS_BAR_END_DELAY} />
			</React.Fragment>
		);
	}

}

PreparingSection.propTypes = {
	producers: PropTypes.number.isRequired,
	stepProgress: PropTypes.string.isRequired,
	readyProducers: PropTypes.number.isRequired,
	preparingBlock: PropTypes.number.isRequired,
	averageBlockTime: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		averageBlockTime: state.round.getIn(['averageTransactions', 'averageTime']),
		producers: state.round.get('producers'),
		stepProgress: state.round.get('stepProgress'),
		readyProducers: state.round.get('readyProducers'),
		preparingBlock: state.round.get('preparingBlock'),
	}),
	() => ({}),
)(PreparingSection);
