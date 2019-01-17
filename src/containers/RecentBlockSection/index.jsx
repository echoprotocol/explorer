import React from 'react';
import RecentBlockTable from './RecentBlockTable';
import RecentBlockSidebar from './RecentBlockSidebar';

class RecentBlockSection extends React.Component {

	render() {
		return (
			<div className="recent-block-section">
				<div className="wrap">
					<RecentBlockTable />
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

export default RecentBlockSection;
