import React from 'react';
import PropTypes from 'prop-types';
import { LatestBlockIcon } from '../../components/Icons/HeaderIcons';
import Timer from './Timer';

const Block2 = React.memo((props) => (
	<React.Fragment>
		<div className="preparing-head">
			<LatestBlockIcon />
			<span className="preparing-caption">
				<Timer diff={props.diff} />
			</span>
		</div>
		<div className="preparing-line">
			<span className="preparing-text">Latest block time</span>
		</div>
	</React.Fragment>
));

Block2.propTypes = {
	diff: PropTypes.number.isRequired,
};

export default Block2;
