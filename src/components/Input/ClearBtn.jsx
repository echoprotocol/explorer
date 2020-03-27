import React from 'react';
import PropTypes from 'prop-types';

const ClearBtn = React.memo(({ onClearFocus, onClearBlur, ...props }) => (
	<button {...props} onFocus={onClearFocus} onBlur={onClearBlur} className="clear-btn">
		<div className="cear-btn-contnet">
			<svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8.37 0C4.27 0 .87 3.4.87 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S12.47 0 8.37 0zm4.2 10.3l-1.4 1.4-2.8-2.8-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z"
				/>
			</svg>
		</div>
	</button>
));

ClearBtn.propTypes = {
	onClearFocus: PropTypes.func.isRequired,
	onClearBlur: PropTypes.func.isRequired,
};


export default ClearBtn;
