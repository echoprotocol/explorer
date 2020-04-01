import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Logotype from '../Logotype';
import HeaderSearch from '../../components/SearchFields';
import NavTabs from './NavTabs';
import { INDEX_PATH } from '../../constants/RouterConstants';

class Header extends React.Component {

	render() {

		const {
			hints, getHints, loadingSearch, errorSearch, isMobile,
		} = this.props;
		return (
			<header>
				<Logotype onClick={() => Router.push(INDEX_PATH)} />
				<NavTabs />
				<Media query="(max-width: 767px)" defaultMatches={isMobile}>
					{(matches) =>
						(matches ? (
							<HeaderSearch
								loadingSearch={loadingSearch}
								errorSearch={errorSearch}
								withHelp
								getHints={getHints}
								hints={hints}
								small
								placeholder="Search"
							/>
						) : (
							<HeaderSearch
								loadingSearch={loadingSearch}
								errorSearch={errorSearch}
								withHelp
								hints={hints}
								getHints={getHints}
								placeholder="Search by account / block / id"
							/>
						))
					}
				</Media>
			</header>
		);
	}

}

Header.propTypes = {
	isMobile: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string,
	loadingSearch: PropTypes.bool,
	hints: PropTypes.array,
	getHints: PropTypes.func,
};

Header.defaultProps = {
	hints: [],
	loadingSearch: false,
	errorSearch: '',
	getHints: () => {},
};

export default Header;
