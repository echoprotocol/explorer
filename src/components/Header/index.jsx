import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';

import Logotype from '../Logotype';
import SearchField from '../../components/SearchFields';
import NavTabs from './NavTabs';
import { INDEX_PATH } from '../../constants/RouterConstants';


const Header = React.memo(({
	history, hints, getHints, loadingSearch, errorSearch, pathName,
}) => (
	<header>
		<Logotype onClick={() => history.push(INDEX_PATH)} />
		<NavTabs pathName={pathName} />
		<Media query="(max-width: 768px)">
			{(matches) =>
				(<SearchField
					loadingSearch={loadingSearch}
					errorSearch={errorSearch}
					withHelp
					getHints={getHints}
					hints={hints}
					history={history}
					small={matches}
					placeholder="Search by account / block / transaction"
				/>)}
		</Media>
	</header>
));

Header.propTypes = {
	pathName: PropTypes.string.isRequired,
	errorSearch: PropTypes.string,
	loadingSearch: PropTypes.bool,
	history: PropTypes.object,
	hints: PropTypes.array,
	getHints: PropTypes.func,
};

Header.defaultProps = {
	hints: [],
	loadingSearch: false,
	errorSearch: '',
	history: {},
	getHints: () => {},
};

export default Header;
