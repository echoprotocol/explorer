import React from 'react';

export const PrevButton = React.memo(() => (
	<div className="pg-arrow">
		<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 2.5L0 5V0l4 2.5z" />
		</svg>
		<div className="pg-arrow-caption">Previous</div>
	</div>
));
