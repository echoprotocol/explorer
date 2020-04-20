import React from 'react';
import PropTypes from 'prop-types';
import ContractInfoBlock from './ContractInfoBlock';
import ContractDescription from './ContractDescription';
import ContractAssets from './ContractAssets';


class ContractInfo extends React.Component {

	render() {
		const { dataDescription, dataAssets, dataGeneral } = this.props;

		return (
			<div className="page-t-block">
				<div className="help-container">
					<div className="left-card">
						<ContractInfoBlock data={dataGeneral} />
					</div>
					<div className="right-container">
						<ContractDescription data={dataDescription} />
						<ContractAssets data={dataAssets} />
					</div>
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
