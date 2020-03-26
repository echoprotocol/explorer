import React from 'react';
import { getAppVersion } from '../../helpers/GlobalHelper';
import FormatHelper from '../../helpers/FormatHelper';

const Footer = React.memo(() => (
	<footer className="footer">
		<div className="wrap sm">
			<div className="footer__version">v{getAppVersion()}</div>
			<div className="footer__info">©ECHO DEVELOPMENT LTD, {FormatHelper.getYear(new Date())}</div>
		</div>
	</footer>
));

export default Footer;
