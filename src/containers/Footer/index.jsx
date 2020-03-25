import React from 'react';
import { getAppVersion } from '../../helpers/GlobalHelper';
import FormatHelper from '../../helpers/FormatHelper';

const Footer = () => {
	const appVersion = getAppVersion();
	return (
		<footer className="footer">
			<div className="wrap sm">
				<div className="footer__version">v{appVersion}</div>
				<div className="footer__info">©ECHO DEVELOPMENT LTD, {FormatHelper.getYear(new Date())}</div>
			</div>
		</footer>
	);
};

export default Footer;
