import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormatHelper from '../../../helpers/FormatHelper';

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
		const { latestBlock } = this.props;

		return (
			<div className="recent-block-sidebar">
				<div className="help-container">
					<div className="sidebar-elem">
						<div className="title">Latest block number</div>
						<div className="value">{FormatHelper.formatAmount(latestBlock, 0)}</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Latest block time</div>
						<div className="value">{this.state.timer}&nbsp;<span className="sm">sec</span></div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Average transactions amount</div>
						<div className="value">466.33</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">average block time (24h)</div>
						<div className="value">4.56&nbsp;<span className="sm">sec</span></div>
					</div>
				</div>
			</div>
		);
	}

}

RecentBlockSidebar.propTypes = {
	latestBlock: PropTypes.number.isRequired,
};

export default connect(
	(state) => ({
		latestBlock: state.round.get('latestBlock'),
	}),
	() => ({}),
)(RecentBlockSidebar);
