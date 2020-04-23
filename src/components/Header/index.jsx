import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import cn from 'classnames';

import Logotype from '../Logotype';
import SearchField from '../SearchFields';
import NavTabs from './NavTabs';
import NetDropdown from '../NetDropdown';
import Burger from '../Burger';
import { INDEX_PATH } from '../../constants/RouterConstants';
import { MAINNET_MODE, TESTNET_MODE } from '../../constants/GlobalConstants';

const Header = React.memo(({
	hints, getHints, loadingSearch, errorSearch,
}) => {
	const [ismobileMenuActive, setMobileMenuActive] = useState(false);

	const onMobileMenuToggle = () => {
		setMobileMenuActive(!ismobileMenuActive);
	};

	return (
		<React.Fragment>
			<header className={cn({ opened: ismobileMenuActive })}>
				<Logotype onClick={() => Router.push(INDEX_PATH)} />
				<div className={cn('header-actions-wrap', { opened: ismobileMenuActive })}>
					<NavTabs />
					<NetDropdown options={[
						{
							title: 'Mainnet',
							id: MAINNET_MODE,
						},
						{
							title: 'Testnet',
							id: TESTNET_MODE,
						}]
					}
					/>
				</div>
				<SearchField
					loadingSearch={loadingSearch}
					errorSearch={errorSearch}
					withHelp
					getHints={getHints}
					hints={hints}
					placeholder="Search by account / block / transaction"
				/>
				<Burger isActive={ismobileMenuActive} onClick={onMobileMenuToggle} />
			</header>
		</React.Fragment>
	);
});

Header.propTypes = {
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
