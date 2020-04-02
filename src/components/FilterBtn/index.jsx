
import React from 'react';

const FilterBtn = React.memo(({ ...props }) => (
	<button className="filter-btn" {...props}>
		<svg width="10" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3.4 4.3l.1.3v4.1c0 .2.2.3.3.3l2.3-1 .1-.2V4.6l.1-.3L9.7.5c.2-.2 0-.5-.3-.5h-9C0 0-.2.3 0 .5l3.3 3.8z" />
		</svg>
		<span className="caption">Filer</span>
	</button>
));

export default FilterBtn;
