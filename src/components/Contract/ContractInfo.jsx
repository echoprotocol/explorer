import React from 'react';
import PropTypes from 'prop-types';
import ContractDescription from './ContractDescription';
import ContractAssets from './ContractAssets';
import ContractGeneralInfo from './ContractGeneralInfo';

class ContractInfo extends React.Component {

	render() {
		const { dataDescription, dataAssets, dataGeneral } = this.props;

		return (
			<div className="contract-info-panel">
				<div className="row">
					<div className="column-left">
						<ContractDescription data={dataDescription} />
						<ContractGeneralInfo data={dataGeneral} matches />
						<ContractAssets data={dataAssets} />
					</div>
					<ContractGeneralInfo data={dataGeneral} matches={false} />
				</div>
			</div>
		);
	}

}

ContractInfo.propTypes = {
	dataDescription: PropTypes.object.isRequired,
	dataAssets: PropTypes.object.isRequired,
	dataGeneral: PropTypes.object.isRequired,
};

ContractInfo.defaultProps = {};

export default ContractInfo;
