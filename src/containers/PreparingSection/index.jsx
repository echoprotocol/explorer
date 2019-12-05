import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SimplePreparingBlock from './PreparingBlock/SimplePreparingBlock';
import CompositePreparingBlock from './PreparingBlock/CompositePreparingBlock';

import {
	BBA_STARTED,
	BBA_TIP,
	GC_TIP,
	ROUND_STARTED,
	GC_STARTED,
	DONE,
	PRODUCING_TIP,
	rounderSteps,
	PROGRESS_STATUS,
	DONE_STATUS,
	GC_START_DELAY,
} from '../../constants/RoundConstants';

import FormatHelper from '../../helpers/FormatHelper';

class PreparingSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			producing: PROGRESS_STATUS,
			verifyingGC: PROGRESS_STATUS,
			verifyingBBA: PROGRESS_STATUS,
			readyProducers: 0,
		};

		this.readyProducers = null;
	}

	shouldComponentUpdate(nextProps) {
		const { stepProgress } = this.props;

		if (stepProgress && nextProps.stepProgress !== stepProgress) {
			if (
				(nextProps.stepProgress === ROUND_STARTED)
			) {
				this.setVerifyingBBA(DONE_STATUS);
			} else if (nextProps.stepProgress === BBA_STARTED) {
				this.setVerifyingGC(DONE_STATUS);
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
			title: rounderSteps[stepProgress].title,
			currentStep,
			status: stepStatus,
		};
	}

	updateReadyProducers(readyProducers) {
		this.setState({ readyProducers });
	}

	render() {
		const {
			producers, stepProgress, preparingBlock,
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
									<p className="mobile-title">Next block</p>
								) : (
									<SimplePreparingBlock title="Next block" description={FormatHelper.formatAmount(preparingBlock, 0)} />
								))
							}
						</Media>

						<Media query="(max-width: 767px)">
							{(matches) =>
								(matches ? (
									<CompositePreparingBlock
										composite
										title={mobileData.title}
										currentStep={mobileData.currentStep}
										totalStep={rounderSteps.totalStep}
										description={`Producers: ${readyProducers}/${producers}`}
										status={mobileData.status}
										tooltip
									/>
								) : (
									<React.Fragment>
										<SimplePreparingBlock
											title="Block proposals"
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
			</React.Fragment>
		);
	}

}

PreparingSection.propTypes = {
	producers: PropTypes.number.isRequired,
	stepProgress: PropTypes.string.isRequired,
	readyProducers: PropTypes.number.isRequired,
	preparingBlock: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		producers: state.round.get('producers'),
		stepProgress: state.round.get('stepProgress'),
		readyProducers: state.round.get('readyProducers'),
		preparingBlock: state.round.get('preparingBlock'),
	}),
	() => ({}),
)(PreparingSection);
