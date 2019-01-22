import React from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Logotype from '../Logotype';
import HeaderSearch from '../../containers/HeaderSearch';
import { INDEX_PATH } from '../../constants/RouterConstants';

class Header extends React.Component {

	render() {
		return (
			<header>
				<Logotype onClick={() => this.props.history.push(INDEX_PATH)} />
				<Media query="(max-width: 767px)">
					{(matches) =>
						(matches ? (
							<HeaderSearch small placeholder="Search" />
						) : (
							<HeaderSearch withHelp placeholder="Search by account / block / transaction" />
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
