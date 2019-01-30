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
	PRODUCING_TIP,
	rounderSteps,
	MIN_PERCENT_PROGRESS_BAR,
	MAX_PERCENT_PROGRESS_BAR,
	PROGRESS_BAR_STEP_RANGE,
	AVERAGE_TIME,
	ROUND_STARTED,
} from '../../constants/RoundConstants';

import FormatHelper from '../../helpers/FormatHelper';

class PreparingSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progressBar: MIN_PERCENT_PROGRESS_BAR,
			transparent: true,
		};
		this.progressInterval = null;
	}

	componentDidMount() {
		const { averageTransactions } = this.props;
		const averageTime = averageTransactions.get('averageTime');
		this.startProgressBar(averageTime && averageTime * 1000);
	}

	shouldComponentUpdate(nextProps) {
		const { stepProgress, averageTransactions } = this.props;

		if (
			(stepProgress && nextProps.stepProgress !== stepProgress) &&
			(rounderSteps[nextProps.stepProgress].step === rounderSteps[ROUND_STARTED].step)
		) {

			const averageTime = averageTransactions.get('averageTime');
			clearInterval(this.progressInterval);
			this.setState({
				progressBar: rounderSteps[nextProps.stepProgress].progress,
			});
			this.startProgressBar(averageTime && averageTime * 1000);
		}

		return true;
	}
	componentWillUnmount() {
		clearInterval(this.progressInterval);
	}

	startProgressBar(averageTime = AVERAGE_TIME) {
		const intervalPeriods = averageTime / MAX_PERCENT_PROGRESS_BAR;

		this.progressInterval = setInterval(() => {
			if (this.state.progressBar < MAX_PERCENT_PROGRESS_BAR) {
				this.setState({
					progressBar: this.state.progressBar += PROGRESS_BAR_STEP_RANGE,
				});
			} else {
				clearInterval(this.progressInterval);
			}
		}, intervalPeriods);
	}

	render() {
		const {
			producers, stepProgress, readyProducers, preparingBlock,
		} = this.props;

		const {
			progressBar, transparent,
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
										status={stepProgress === BBA_STARTED ? 'done' : 'progress'}
										tooltip
									/>
								) : (
									<React.Fragment>
										<SimplePreparingBlock
											title="Producing block"
											description={`Producers: ${readyProducers}/${producers}`}
											status={rounderSteps[stepProgress].producing}
											tooltip
											tip={PRODUCING_TIP}
										/>
										<SimplePreparingBlock
											className="sm-border"
											title="Verifying block: GC"
											smallTitle="Verifying: GC"
											description="Verifying"
											status={rounderSteps[stepProgress].verifying}
											tooltip
											tip={GC_TIP}
										/>
										<SimplePreparingBlock tip={BBA_TIP} title="Verifying block: BBA" smallTitle="Verifying: BBA" description="Pending" tooltip />
									</React.Fragment>
								))
							}
						</Media>
					</div>
				</div>
				<Loader status={progressBar} transparent={transparent} />
			</React.Fragment>
		);
	}

}

PreparingSection.propTypes = {
	producers: PropTypes.number.isRequired,
	stepProgress: PropTypes.string.isRequired,
	readyProducers: PropTypes.number.isRequired,
	preparingBlock: PropTypes.number.isRequired,
	averageTransactions: PropTypes.object.isRequired,
};

export default connect(
	(state) => ({
		averageTransactions: state.round.get('averageTransactions'),
		producers: state.round.get('producers'),
		stepProgress: state.round.get('stepProgress'),
		readyProducers: state.round.get('readyProducers'),
		preparingBlock: state.round.get('preparingBlock'),
	}),
	() => ({}),
)(PreparingSection);
