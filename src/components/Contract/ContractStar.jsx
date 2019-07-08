import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Star from '../StarButton';

class ContractStar extends React.Component {

	render() {
		const { stars, activeAccount } = this.props;

		return (
			<Star
				star={stars.includes(activeAccount.get('id'))}
				onClick={() => this.props.setStarToContract()}
				countStar={stars.size}
			/>
		);
	}

}


ContractStar.propTypes = {
	activeAccount: PropTypes.object.isRequired,
	setStarToContract: PropTypes.func.isRequired,
	stars: PropTypes.object,
};

ContractStar.defaultProps = {
	stars: new List(),
};

export default ContractStar;
