import React from 'react';

class RecentBlockSidebar extends React.Component {

	render() {
		return (
			<div className="recent-block-sidebar">
				<div className="help-container">
					<div className="sidebar-elem">
						<div className="title">Latest block number</div>
						<div className="value">1,265,456</div>
					</div>
					<div className="sidebar-elem">
						<div className="title">Latest block time</div>
						<div className="value">1,265,456&nbsp;<span className="sm">sec</span></div>
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

export default RecentBlockSidebar;
