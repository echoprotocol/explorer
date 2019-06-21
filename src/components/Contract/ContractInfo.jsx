import React from 'react';
// import PropTypes from 'prop-types';
import Media from 'react-media';
import ContractInfoBlock from './ContractInfoBlock';
import Avatar from '../Avatar';


class ContractInfo extends React.Component {

	render() {
		return (
			<div className="contract-info-panel">
				<div className="row">
					<div className="column-left">

						<div className="created-info">
							<div className="plain-text">Created</div>
							<span className="date">10.06.2019</span>
							<span className="time">15:23</span>
							<div className="plain-text">by</div>
							<span className="no-wrap">
								<Avatar accountName="Homersimpson3342" />
								<a className="link" href="">Homersimpson3342</a>
							</span>
						</div>

						<div className="description short">
							Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in,
							pharetra a, ulterum sencturiam at evissdsdMorbi in sem quis dui placerat ornare.
							Pellentesque odio nisi, euismod in, pharetra a, ulterum sencturiam at evissdsd
						</div>
						<button className="text-button">
							Read full description
						</button>
						<Media query="(max-width: 768px)">
							{(matches) =>
								matches &&
									<div className="column-right">
										<ContractInfoBlock />
									</div>
							}
						</Media>
						<div className="assets-title">assets:</div>
						<ul className="assets-list">
							<li>
								<span className="value">0.003245</span>
								<span className="currency">PMD</span>
							</li>
							<li>
								<span className="value">0.003245</span>
								<span className="currency">DRM</span>
							</li>

							{/* if max-width: 768px show 2 assets in preview, else show 4 */}
							<Media query="(max-width: 1000px)">
								{(matches) =>
									!matches &&
									<React.Fragment>
										<li>
											<span className="value">0.0032934245</span>
											<span className="currency">ZSCH</span>
										</li>
										<li>
											<span className="value">0.0032934245</span>
											<span className="currency">DSKL</span>
										</li>
									</React.Fragment>
								}
							</Media>

						</ul>
						<button className="text-button">
							View 19 more
						</button>

					</div>
					<Media query="(max-width: 768px)">
						{(matches) =>
							!matches &&
								<div className="column-right">
									<ContractInfoBlock />
								</div>
						}
					</Media>

				</div>
			</div>
		);
	}

}

ContractInfo.propTypes = {
	// bytecode: PropTypes.string,
};

ContractInfo.defaultProps = {
	// bytecode: null,
};

export default ContractInfo;
