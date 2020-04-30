import React, { useState } from 'react';
import cn from 'classnames';
import closeIcon from '../../public/images/icons/close-network-icon.svg';
import config from '../../config/chain';

const NetworkNotification = React.memo(() => {
	const [isHidden, setHidden] = useState(false);

	return (
		<div className={cn('network-notification', { hidden: isHidden })}>
			<div className="network-notification-wrap wrap">
				<div className="network-notification__body">
					<span className="network-notification__info">The Explorer is connected to the test network. To view real transactions and balances use the &nbsp;</span>
					<a
						href={config.EXPLORER_URLS.MAINNET}
						className="network-notification__link"
						target="_blank"
						rel="noopener noreferrer"
					>
						main network
					</a>
				</div>
				<button
					onClick={() => setHidden(true)}
					className="network-notification__close"
				>
					<img src={closeIcon} alt="close" />
				</button>
			</div>
		</div>
	);
});

export default NetworkNotification;
