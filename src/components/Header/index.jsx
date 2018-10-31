import React from 'react';
import Media from 'react-media';
import Logotype from '../Logotype';
import HeaderSearchField from '../SearchFields/HeaderSearchField';

class Header extends React.Component {

	render() {
		return (
			<header>
				<Logotype />
				<Media query="(max-width: 767px)">
					{(matches) =>
						(matches ? (
							<HeaderSearchField small placeholder="Search" />
						) : (
							<HeaderSearchField placeholder="Search by account / block / transaction" />
						))
					}
				</Media>
			</header>
		);
	}

}

export default Header;
