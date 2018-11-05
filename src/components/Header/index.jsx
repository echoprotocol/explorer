import React from 'react';
import Media from 'react-media';
import Logotype from '../Logotype';
import SearchField from '../SearchFields/SearchField';

class Header extends React.Component {

	render() {
		return (
			<header>
				<Logotype />
				<Media query="(max-width: 767px)">
					{(matches) =>
						(matches ? (
							<SearchField small placeholder="Search" />
						) : (
							<SearchField withHelp placeholder="Search by account / block / transaction" />
						))
					}
				</Media>
			</header>
		);
	}

}

export default Header;
