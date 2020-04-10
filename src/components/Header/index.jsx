import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Logotype from '../Logotype';
import SearchField from '../SearchFields';
import NavTabs from './NavTabs';
import { INDEX_PATH } from '../../constants/RouterConstants';

const Header = React.memo(({
	hints, getHints, loadingSearch, errorSearch,
}) => (
	<header>
		<Logotype onClick={() => Router.push(INDEX_PATH)} />
		<NavTabs />
		<SearchField
			loadingSearch={loadingSearch}
			errorSearch={errorSearch}
			withHelp
			getHints={getHints}
			hints={hints}
			placeholder="Search by account / block / transaction"
		/>
	</header>
));

Header.propTypes = {
	loadingSearch: PropTypes.bool,
	errorSearch: PropTypes.string,
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
