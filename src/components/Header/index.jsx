import React from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Logotype from '../Logotype';
import SearchField from '../SearchFields/SearchField';
import { INDEX_PATH } from '../../constants/RouterConstants';

class Header extends React.Component {

	render() {
		return (
			<header>
				<Logotype onClick={() => this.props.history.push(INDEX_PATH)} />
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

Header.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(Header);
