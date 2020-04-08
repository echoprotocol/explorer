import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Media from 'react-media';
import FormatHelper from '../../../helpers/FormatHelper';
import { getAppVersion } from '../../../helpers/GlobalHelper';
import { MAIN_HEADER_HEIGHT } from '../../../constants/GlobalConstants';

class RecentBlockSidebar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			timer: 0,
			offsetTop: 0,
			startTimestamp: this.props.startTimestamp,
		};

		this.intervalId = 0;
		this.updateOffsetTop = this.updateOffsetTop.bind(this);
	}

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState({ timer: this.state.timer += 1 });
		}, 1000);
		this.updateOffsetTop();
		window.addEventListener('scroll', this.updateOffsetTop);
	}

	shouldComponentUpdate(nextProps) {
		if (this.state.startTimestamp !== nextProps.startTimestamp) {
			this.setState({
				timer: 0,
				startTimestamp: this.props.startTimestamp,
			});
		}

		return true;
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
		window.removeEventListener('scroll', this.updateOffsetTop);
	}

	updateOffsetTop() {
		this.setState({ offsetTop: window.pageYOffset });
	}

	averageBlockTime(averageTime) {
		const [hours, minutes, seconds] = FormatHelper.secondsToFullTime(averageTime).split(':')
			.map((i) => FormatHelper.convertToNumber(i));

		if (averageTime) {
			return (
				<React.Fragment>
					{hours ? <span>{hours}<span className="sm">h&nbsp;</span></span> : ''}
					{minutes ? <span>{minutes}<span className="sm">m&nbsp;</span></span> : ''}
					{seconds}<span className="sm">s</span>
				</React.Fragment>);
		}
		return '-';
	}

	render() {
		const { latestBlock, averageTransactions, isMobile } = this.props;
		const { offsetTop } = this.state;

		const averageTr = FormatHelper.roundNumber(averageTransactions.getIn(['transactions', 'value']), 1);
		const averageTime = FormatHelper.roundNumber(averageTransactions.get('averageTime'), 1);
		const appVersion = getAppVersion();
		return (
			<div className="recent-block-sidebar">
				<div className={classnames('sticky-wrap', { sticky: offsetTop > MAIN_HEADER_HEIGHT })}>
					<div className="help-container">
						<div className="sidebar-elem">
							<div className="title">Latest Block Number</div>
							<div className="value">
								<span className="main">{`${FormatHelper.formatAmount(latestBlock, 0)} `}</span>
								<span className="secondary">({FormatHelper.formatLatestBlockTime(this.state.startTimestamp + this.state.timer)})</span>
							</div>
						</div>
						<div className="sidebar-elem">
							<div className="title">Average block time (24h)</div>
							<div className="value">
								<span className="main">{this.averageBlockTime(averageTime)} </span>
								<span className="secondary">({`${averageTr} tx per block`})</span>
							</div>
						</div>
					</div>
					<Media query="(max-width: 1279px)" defaultMatches={isMobile}>
						{
							(matches) => !matches &&
							<div className={classnames('info-container', { fixed: offsetTop > MAIN_HEADER_HEIGHT })}>
								<div className="version">v{appVersion}</div>
								<div className="copyright">©ECHO DEVELOPMENT LTD, {FormatHelper.getYear(new Date())}</div>
							</div>
						}
					</Media>
				</div>
			</div>
		);
	}

}

RecentBlockSidebar.propTypes = {
	isMobile: PropTypes.bool.isRequired,
	latestBlock: PropTypes.number.isRequired,
	startTimestamp: PropTypes.number.isRequired,
	averageTransactions: PropTypes.object.isRequired,
};

export default connect(
	(state) => ({
		latestBlock: state.round.get('latestBlock'),
		averageTransactions: state.round.get('averageTransactions'),
		startTimestamp: state.block.get('startTimestamp'),
		isMobile: state.global.get('isMobile'),
	}),
	() => ({}),
)(RecentBlockSidebar);
