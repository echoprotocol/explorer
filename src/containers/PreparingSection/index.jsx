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
	MS,
	PROGRESS_STATUS,
	DONE_STATUS,
	PROGRESS_BAR_START_DELAY,
	GC_START_DELAY,
	INTERVAL_PERIODS,
	PROGRESS_BAR_END_RATE,
} from '../../constants/RoundConstants';

import FormatHelper from '../../helpers/FormatHelper';

class PreparingSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			status: MIN_PERCENT_PROGRESS_BAR,
			producing: PROGRESS_STATUS,
			verifyingGC: PROGRESS_STATUS,
			verifyingBBA: PROGRESS_STATUS,
			readyProducers: 0,
		};

		this.roundStartedTimeout = null;
		this.gcStartedTimeout = null;

		this.progressInterval = null;
		this.producingTimeout = null;
		this.verifyingGCTimeout = null;
		this.verifyingBBATimeout = null;
		this.readyProducers = null;
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
				this.setVerifyingBBA(DONE_STATUS);
				this.resetProgressBar();
				this.startProgressBar(averageBlockTime && averageBlockTime * MS);
			} else if (
				(nextProps.stepProgress === GC_STARTED)
			) {
				this.gcStartedTimeout = setTimeout(() => {
					clearTimeout(this.roundStartedTimeout);
					this.setState({ status: rounderSteps[GC_STARTED].progress });
					this.setProducing(DONE_STATUS);
				}, GC_START_DELAY);
			} else if (
				(nextProps.stepProgress === DONE)
			) {
				setTimeout(() => {
					if (this.state.producing === PROGRESS_STATUS) {
						return;
					}
					this.setVerifyingGC(DONE_STATUS);
				}, GC_START_DELAY);
			} else if (nextProps.stepProgress === BBA_STARTED) {
				this.setState({ status: rounderSteps[BBA_STARTED].progress });
			}
		}

		return true;
	}

	componentDidUpdate(prevProps) {
		const { readyProducers } = this.props;
		if (prevProps.readyProducers !== readyProducers && readyProducers) {
			setTimeout(() => {
				this.updateReadyProducers(readyProducers);
			}, GC_START_DELAY);
		}
	}


	setProducing(status) {
		this.setState({ producing: status });
	}

	setVerifyingGC(status) {
		this.setState({ verifyingGC: status });
	}

	setVerifyingBBA(status) {
		this.setState({ verifyingBBA: status });
	}

	getMobileData(status, producing, verifyingGC) {
		let stepProgress = ROUND_STARTED;
		let currentStep = rounderSteps[ROUND_STARTED].step;
		const stepStatus = status >= rounderSteps[GC_STARTED].progress ? producing : PROGRESS_STATUS;

		if (status >= rounderSteps[DONE].progress && producing === DONE_STATUS && verifyingGC === DONE_STATUS) {
			stepProgress = DONE;
			currentStep = rounderSteps[DONE].step;
		} else if (status >= rounderSteps[GC_STARTED].progress && producing === DONE_STATUS) {
			stepProgress = GC_STARTED;
			currentStep = rounderSteps[GC_STARTED].step;
		} else if (status >= rounderSteps[ROUND_STARTED].progress) {
			stepProgress = ROUND_STARTED;
			currentStep = rounderSteps[ROUND_STARTED].step;
		}

		return {
			titel: rounderSteps[stepProgress].title,
			currentStep,
			status: stepStatus,
		};
	}

	startProgressBar() {
		this.progressInterval = setInterval(() => {
			if (this.state.status < MAX_PERCENT_PROGRESS_BAR) {
				if (this.state.producing === PROGRESS_STATUS && this.state.status >= rounderSteps[ROUND_STARTED].maxProgress) {
					return;
				}
				if (this.state.verifyingGC === PROGRESS_STATUS && this.state.status >= rounderSteps[GC_STARTED].maxProgress) {
					return;
				}
				this.setState({ status: this.state.status += 1 });
			} else {
				clearInterval(this.progressInterval);
			}
		}, INTERVAL_PERIODS);

	}

	resetProgressBar() {

		clearTimeout(this.gcStartedTimeout);

		clearTimeout(this.producingTimeout);
		clearTimeout(this.verifyingGCTimeout);
		clearTimeout(this.verifyingBBATimeout);
		clearTimeout(this.readyProducers);
		this.roundStartedTimeout = setTimeout(() => {
			clearInterval(this.progressInterval);
			this.setState(() => ({
				status: MIN_PERCENT_PROGRESS_BAR,
				producing: PROGRESS_STATUS,
				verifyingGC: PROGRESS_STATUS,
				verifyingBBA: PROGRESS_STATUS,
				readyProducers: 0,
			}));
		}, PROGRESS_BAR_START_DELAY);
	}

	updateReadyProducers(readyProducers) {
		this.setState({ readyProducers });
	}

	render() {
		const {
			producers, stepProgress, preparingBlock, averageBlockTime,
		} = this.props;

		const {
			producing, verifyingGC, verifyingBBA, status, readyProducers,
		} = this.state;

		if (!stepProgress) {
			return null;
		}

		const mobileData = this.getMobileData(status, producing, verifyingGC);

		const isVerifyingGC = verifyingGC === DONE_STATUS && status >= rounderSteps[DONE].progress;
		const isVerifyingBBA = verifyingBBA === DONE_STATUS && status >= rounderSteps[BBA_STARTED].maxProgress;
		const isProducingBlock = producing === DONE_STATUS && status >= rounderSteps[GC_STARTED].progress;

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
										title={mobileData.titel}
										currentStep={mobileData.currentStep}
										totalStep={rounderSteps.totalStep}
										description={`Producers: ${readyProducers}/${producers}`}
										status={mobileData.status}
										tooltip
									/>
								) : (
									<React.Fragment>
										<SimplePreparingBlock
											title="Producing block"
											description={`Producers: ${readyProducers}/${producers}`}
											status={isProducingBlock ? producing : PROGRESS_STATUS}
											tooltip
											tip={PRODUCING_TIP}
										/>
										<SimplePreparingBlock
											className="sm-border"
											title="Verifying block: GC"
											smallTitle="Verifying: GC"
											description={isVerifyingGC ? 'Verifying' : 'Pending'}
											status={isVerifyingGC ? verifyingGC : PROGRESS_STATUS}
											tooltip
											tip={GC_TIP}
										/>
										<SimplePreparingBlock
											tip={BBA_TIP}
											title="Verifying block: BBA"
											smallTitle="Verifying: BBA"
											description={isVerifyingBBA ? 'Verifying' : 'Pending'}
											status={isVerifyingBBA ? verifyingBBA : PROGRESS_STATUS}
											tooltip
										/>
									</React.Fragment>
								))
							}
						</Media>
					</div>
				</div>
				<Loader status={status} executeTime={averageBlockTime / PROGRESS_BAR_END_RATE} />
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
