import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { MAX_WIDTH_SCREEN } from '../../constants/GlobalConstants';
import ContractInfoBlock from './ContractInfoBlock';

class ContractGeneralInfo extends React.Component {

	render() {
		const { data } = this.props;

		return (
			<Media query={`(max-width: ${MAX_WIDTH_SCREEN})`}>
				{
					(matches) => matches === this.props.matches && <ContractInfoBlock data={data} />
				}
			</Media>
		);
	}

}


ContractGeneralInfo.propTypes = {
	data: PropTypes.object.isRequired,
	matches: PropTypes.bool.isRequired,
};

ContractGeneralInfo.defaultProps = {};

export default ContractGeneralInfo;
