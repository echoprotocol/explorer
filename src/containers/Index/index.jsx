import React from 'react';
import Navigation from '../../containers/Navigation';
import PreparingSection from '../../containers/PreparingSection';
import MainContainer from '../../containers/RecentBlockSection';

class Index extends React.Component {

	render() {

		return (
			<div>
				<div className="top-section">
					<Navigation />
					<PreparingSection />
				</div>
				<MainContainer />
			</div>
		);
	}

}

export default Index;
