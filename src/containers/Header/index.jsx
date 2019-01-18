import React from 'react';
import Navigation from '../../containers/Navigation';
import PreparingSection from '../../containers/PreparingSection';

class Header extends React.Component {

	render() {

		return (
			<div>
				<div className="top-section">
					<Navigation />
					<PreparingSection />
				</div>
			</div>
		);
	}

}

export default Header;
