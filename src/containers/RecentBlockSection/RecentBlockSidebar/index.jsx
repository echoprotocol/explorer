import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Media from 'react-media';
import FormatHelper from '../../../helpers/FormatHelper';
import { getAppVersion } from '../../../helpers/GlobalHelper';


class RecentBlockSidebar extends React.Component {

	constructor(props) {
		super(props);

		this.state = { timer: 0 };

		this.intervalId = 0;
	}

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState({ timer: this.state.timer += 1 });
		}, 1000);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.latestBlock !== nextProps.latestBlock) {
			this.setState({ timer: 0 });
		}

		return true;
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	render() {
		const { latestBlock, averageTransactions, startTimestamp } = this.props;

		const averageTr = FormatHelper.roundNumber(averageTransactions.getIn(['transactions', 'value']), 1);
		const averageOp = FormatHelper.roundNumber(averageTransactions.getIn(['operations', 'value']), 1);
		const averageTime = FormatHelper.roundNumber(averageTransactions.get('averageTime'), 1);
		const appVersion = getAppVersion();

		return (
			<div className="recent-block-sidebar">
				<div className="help-container">
					<div className="sidebar-elem">
						<div className="title">Latest block number</div>
						<div className="value">{FormatHelper.formatAmount(latestBlock, 0)}</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Latest block time</div>
						<div className="value">{FormatHelper.formatLatestBlockTime(startTimestamp + this.state.timer)}</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Average transactions / operations count</div>
						<div className="value">{`${averageTr}/${averageOp}`}</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Average block time</div>
						<div className="value">
							{averageTime ? (<React.Fragment>{averageTime}&nbsp;<span className="sm">sec</span></React.Fragment>) : '-'}
						</div>
					</div>
				</div>
				<Media query="(max-width: 1279px)">
					{
						(matches) => !matches &&
						<div className="info-container">
							<div className="version">v{appVersion}</div>
							<div className="copyright">©Echo Technological Solutions LLC, {FormatHelper.getYear(new Date())}</div>
						</div>
					}
				</Media>

			</div>
		);
	}

}

RecentBlockSidebar.propTypes = {
	latestBlock: PropTypes.number.isRequired,
	startTimestamp: PropTypes.number.isRequired,
	averageTransactions: PropTypes.object.isRequired,
};

export default connect(
	(state) => ({
		latestBlock: state.round.get('latestBlock'),
		averageTransactions: state.round.get('averageTransactions'),
		startTimestamp: state.block.get('startTimestamp'),
	}),
	() => ({}),
)(RecentBlockSidebar);
