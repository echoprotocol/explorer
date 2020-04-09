import React from 'react';
import PropTypes from 'prop-types';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';


const Block2 = React.memo((props) => {
	const { diff } = props;
	console.log(diff)
	return (
		<React.Fragment>
			<div className="preparing-head">
				<LatestBlockIcon />
				<span className="preparing-caption">
					<span className="accent">{Math.floor(diff / 60 / 60)}h </span>
					: {Math.floor((diff / 60) % 60)}m : {Math.floor(diff % 60)}s
				</span>
			</div>
			<div className="preparing-line">
				<span className="preparing-text">Latest block time</span>
			</div>
		</React.Fragment>
	);
});


Block2.propTypes = {
	diff: PropTypes.number.isRequired,
};

export default Block2;
