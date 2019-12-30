import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SimplePreparingBlock from './PreparingBlock/SimplePreparingBlock';
import CompositePreparingBlock from './PreparingBlock/CompositePreparingBlock';

import {
	BBA_TIP,
	GC_TIP,
	PRODUCING_TIP,
	rounderSteps,
	PROGRESS_STATUS,
	DONE_STATUS,
	GC_START_DELAY,
	PRODUCED_DELAY,
	BLOCK_APPLIED_CALLBACK,
	GC_STARTED,
	BBA_STARTED,
	ROUND_STARTED,
	BLOCK_PRODUCED,
} from '../../constants/RoundConstants';

import FormatHelper from '../../helpers/FormatHelper';

class PreparingSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			readyProducers: 0,
			description: 'Waiting',
			status: '',
			applied: false,
			nextBlockDescription: '',
			title: 'Waiting',
		};

		this.setTimeId = null;
		this.readyProducers = null;
	}

	shouldComponentUpdate(newProps) {
		const { readyProducers, stepProgress, preparingBlock } = newProps;
		if (this.props.readyProducers !== readyProducers && readyProducers) {
			setTimeout(() => this.updateReadyProducers(readyProducers), GC_START_DELAY);
		}
		if (this.props.preparingBlock !== preparingBlock) {
			this.setState({ nextBlockDescription: preparingBlock });
		}

		if (stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && this.setTimeId === null) {
			clearTimeout(this.setTimeId);
			this.setState({ applied: true });
			this.setTimeId = setTimeout(() => {
				this.setState({
					applied: false,
				});
				this.updateBlockProduced(stepProgress, readyProducers);
				this.setTimeId = null;
			}, PRODUCED_DELAY);

		}
		return true;
	}

	getMobileData(stepProgress, readyProducers) {
		let stepStatus = PROGRESS_STATUS;
		if (stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status) {
			stepStatus = DONE_STATUS;
		}

		let { title } = rounderSteps[stepProgress];
		if (stepProgress === rounderSteps[BLOCK_PRODUCED].status) {
			title = `Received ${readyProducers} proposals`;
		}

		return {
			title,
			status: stepStatus,
		};
	}

	getNextBlockState(stepProgress, preparingBlock) {
		return {
			description: preparingBlock,
			status: DONE_STATUS,
		};
	}

	getGCData(stepProgress) {
		switch (stepProgress) {
			case rounderSteps[GC_STARTED].status:
				return {
					description: 'Verifying',
					status: PROGRESS_STATUS,
				};
			case rounderSteps[BBA_STARTED].status:
				return {
					description: 'Verified',
					status: DONE_STATUS,
				};
			case rounderSteps[BLOCK_APPLIED_CALLBACK].status:
				return {
					description: 'Verified',
					status: DONE_STATUS,
				};
			default:
				return {
					description: 'Waiting',
					status: '',
				};
		}
	}

	getBBAData(stepProgress) {
		switch (stepProgress) {
			case rounderSteps[BBA_STARTED].status:
				return {
					description: 'Verifying',
					status: PROGRESS_STATUS,
				};
			case rounderSteps[BLOCK_APPLIED_CALLBACK].status:
				return {
					description: 'Verified',
					status: DONE_STATUS,
				};
			default:
				return {
					description: 'Waiting',
					status: '',
				};
		}
	}

	blockProposalData(stepProgress, readyProducers) {
		switch (stepProgress) {
			case rounderSteps[BLOCK_APPLIED_CALLBACK].status:
				return {
					description: `Received ${readyProducers} proposals`,
					status: DONE_STATUS,
				};
			case rounderSteps[ROUND_STARTED].status:
				return {
					description: 'Waiting for proposals',
					status: PROGRESS_STATUS,
				};
			case rounderSteps[BLOCK_PRODUCED].status && readyProducers > 0:
				return {
					description: `Received ${readyProducers} proposals`,
					status: PROGRESS_STATUS,
				};
			default:
				return {
					description: `Received ${readyProducers} proposals`,
					status: DONE_STATUS,
				};
		}
	}

	updateReadyProducers(readyProducers) {
		this.setState({ readyProducers });
	}

	updateBlockProduced(stepProgress) {
		if (stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status) {
			this.setState({
				description: 'Waiting',
				status: '',
				nextBlockDescription: `${this.state.nextBlockDescription} Waiting for new txs`,
				title: 'Waiting for new txs',
			});
		}
	}

	render() {
		const { stepProgress, preparingBlock } = this.props;
		const {	readyProducers } = this.state;

		if (!stepProgress) {
			return null;
		}

		const mobileData = this.getMobileData(stepProgress, readyProducers);
		const blockProposalData = this.blockProposalData(stepProgress, readyProducers);
		const GCData = this.getGCData(stepProgress);
		const BBAData = this.getBBAData(stepProgress);

		const nextBlockData = this.getNextBlockState(stepProgress, FormatHelper.formatAmount(preparingBlock, 0));

		return (
			<React.Fragment>
				<div className="wrap">
					<div className="preparing-section">
						<Media query="(max-width: 499px)">
							{(matches) =>
								(matches ? (
									<p className="mobile-title">{`Next block ${preparingBlock}`}</p>
								) : (
									<SimplePreparingBlock
										title="Next block"
										description={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
											this.state.nextBlockDescription : nextBlockData.description}
										status={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
											this.state.status : nextBlockData.status}
									/>
								))
							}
						</Media>

						<Media query="(max-width: 767px)">
							{
								(matches) =>
									(matches ? (
										<CompositePreparingBlock
											composite
											title={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
												this.state.title : mobileData.title}
											description={`Received ${readyProducers} proposals`}
											status={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
												this.state.status : mobileData.status}
											tooltip
										/>
									) : (
										<React.Fragment>
											<SimplePreparingBlock
												title="Block proposals"
												description={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.description : blockProposalData.description}
												status={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.status : blockProposalData.status}
												tooltip
												tip={PRODUCING_TIP}
											/>
											<SimplePreparingBlock
												className="sm-border"
												title="Verifying block: GC"
												smallTitle="Verifying: GC"
												description={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.description : GCData.description}
												status={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.status : GCData.status}
												tooltip
												tip={GC_TIP}
											/>
											<SimplePreparingBlock
												tip={BBA_TIP}
												title="Verifying block: BBA"
												smallTitle="Verifying: BBA"
												description={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.description : BBAData.description}
												status={stepProgress === rounderSteps[BLOCK_APPLIED_CALLBACK].status && !this.state.applied ?
													this.state.status : BBAData.status}
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
	stepProgress: PropTypes.string.isRequired,
	readyProducers: PropTypes.number.isRequired,
	preparingBlock: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		stepProgress: state.round.get('stepProgress'),
		readyProducers: state.round.get('readyProducers'),
		preparingBlock: state.round.get('preparingBlock'),
	}),
	() => ({}),
)(PreparingSection);
