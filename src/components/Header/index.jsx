import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';

import Logotype from '../Logotype';
import HeaderSearch from '../../components/SearchFields';
import { INDEX_PATH } from '../../constants/RouterConstants';

class Header extends React.Component {

	render() {

		const {
			history, hints, getHints, loadingSearch, errorSearch,
		} = this.props;
		return (
			<header>
				<Logotype onClick={() => this.props.history.push(INDEX_PATH)} />
				<Media query="(max-width: 767px)">
					{(matches) =>
						(matches ? (
							<HeaderSearch
								loadingSearch={loadingSearch}
								errorSearch={errorSearch}
								withHelp
								getHints={getHints}
								hints={hints}
								history={history}
								small
								placeholder="Search"
							/>
						) : (
							<HeaderSearch
								loadingSearch={loadingSearch}
								errorSearch={errorSearch}
								withHelp
								hints={hints}
								history={history}
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
