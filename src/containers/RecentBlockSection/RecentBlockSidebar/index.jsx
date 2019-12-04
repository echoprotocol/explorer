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
		if (this.props.latestBlock !== nextProps.latestBlock) {
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

	render() {
		const { latestBlock, averageTransactions } = this.props;
		const { offsetTop } = this.state;

		const averageTr = FormatHelper.roundNumber(averageTransactions.getIn(['transactions', 'value']), 1);
		const averageOp = FormatHelper.roundNumber(averageTransactions.getIn(['operations', 'value']), 1);
		const averageTime = FormatHelper.roundNumber(averageTransactions.get('averageTime'), 1);
		const appVersion = getAppVersion();
		return (
			<div className="recent-block-sidebar">
				<div className={classnames('sticky-wrap', { sticky: offsetTop > MAIN_HEADER_HEIGHT })}>
					<div className="help-container">
						<div className="sidebar-elem">
							<div className="title">Latest block number</div>
							<div className="value">{FormatHelper.formatAmount(latestBlock, 0)}</div>
						</div>
						<div className="sidebar-elem">
							<div className="title">Latest block time</div>
							<div className="value">{FormatHelper.formatLatestBlockTime(this.state.startTimestamp + this.state.timer)}</div>
						</div>
						<div className="sidebar-elem">
							<div className="title">Average transactions amount</div>
							<div className="value">{`${averageTr}/${averageOp}`}</div>
						</div>
						<div className="sidebar-elem">
							<div className="title">Average block time (24h)</div>
							<div className="value">
								{averageTime ? (<React.Fragment>{averageTime}&nbsp;<span className="sm">sec</span></React.Fragment>) : '-'}
							</div>
						</div>
					</div>
					<Media query="(max-width: 1279px)">
						{
							(matches) => !matches &&
							<div className={classnames('info-container', { fixed: offsetTop > MAIN_HEADER_HEIGHT })}>
								<div className="version">v{appVersion}</div>
								<div className="copyright">©Echo Technological Solutions LLC, {FormatHelper.getYear(new Date())}</div>
							</div>
						}
					</Media>
				</div>
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
