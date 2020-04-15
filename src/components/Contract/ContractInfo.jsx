import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
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
						<Media query="(max-width: 768px)" defaultMatches={dataGeneral.get('isMobile')}>
							{(matches) =>
								(
									!matches && <ContractAssets data={dataAssets} />
								)
							}
						</Media>

					</div>
					<div className="column-right">
						<Media query="(max-width: 768px)" defaultMatches={dataGeneral.get('isMobile')}>
							{(matches) =>
								(
									matches ?
										<React.Fragment>
											<ContractGeneralInfo data={dataGeneral} matches={false} />
											<ContractAssets data={dataAssets} />
										</React.Fragment> :
										<ContractGeneralInfo data={dataGeneral} matches={false} />
								)
							}
						</Media>
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
