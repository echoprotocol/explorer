import React from 'react';
import { getAppVersion } from '../../helpers/GlobalHelper';
import FormatHelper from '../../helpers/FormatHelper';

const Footer = React.memo(() => (
	<footer className="footer">
		<div className="wrap">
			<div className="footer-info">©ECHO DEVELOPMENT LTD, {FormatHelper.getYear(new Date())}</div>
			<div className="footer-version">v{getAppVersion()}</div>
		</div>
	</footer>
));

export default Footer;
