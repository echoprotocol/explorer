import React from 'react';
import Navigation from '../../containers/Navigation';
import PreparingSection from '../../containers/PreparingSection';
import RecentBlockSection from '../../containers/RecentBlockSection';

class Index extends React.Component {

	render() {

		return (
			<div>
				<div className="top-section">
					<Navigation />
					<PreparingSection />
				</div>
				<RecentBlockSection />
			</div>
		);
	}

}

export default Index;
