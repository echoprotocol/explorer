import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import directionIcon from '../../assets/images/icons/direction-icon.svg';
import Avatar from '../Avatar';

class OperationInfo extends React.Component {

	render() {

		return (
			<div className="fold-operation-info">
				<div className="fold-title">Operation info</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">TO:</div>
						<div className="od-col">
							<Link className="avatar-wrap" to="/">
								<Avatar accountName="Homersimpson3423" />
								<span>Homersimpson3423</span>
							</Link>
						</div>
					</div>
					<Media query="(max-width: 1000px)">
						{
							(matches) =>
								(matches &&
								<div className="od-row">
									<div className="od-col">Operation fee:</div>
									<div className="od-col">1.23000 ECHO</div>
								</div>)
						}
					</Media>
					<div className="od-row">
						<div className="od-col">Amount, ASSET:</div>
						<div className="od-col">1.23000 ECHO</div>
					</div>
					<div className="od-row">
						<div className="od-col">Status:</div>
						<div className="od-col">Success</div>
					</div>
					<div className="od-row">
						<div className="od-col">Token transfers:</div>
						<div className="od-col">
							<div className="token-transfer-table">
								<div className="tt-row">
									<div className="tt-col amount">
										<span className="value">1.23000</span>
										<span className="currency">ECHO</span>
									</div>
									<div className="tt-col">
										<div className="transfer-direction">
											<Link className="avatar-wrap" to="/">
												<Avatar accountName="Homersimpson3423" />
												<span>Homersimpson3423</span>
											</Link>
											<img src={directionIcon} alt="" className="direction" />
											<Link className="avatar-wrap" to="/">
												<Avatar accountName="gauto01" />
												<span>gauto01</span>
											</Link>
										</div>
									</div>
								</div>
								<div className="tt-row">
									<div className="tt-col amount">
										<span className="value">1231.003245</span>
										<span className="currency">ECHO</span>
									</div>
									<div className="tt-col">
										<div className="transfer-direction">
											<Link className="avatar-wrap" to="/">
												<Avatar accountName="Homersimpson3423" />
												<span>Homersimpson3423</span>
											</Link>
											<img src={directionIcon} alt="" className="direction" />
											<Link className="avatar-wrap" to="/">
												<Avatar accountName="Igordulub34" />
												<span>Igordulub34</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Code:</div>
						<div className="od-col">
							<div className="mono">
                                a9059cbb0000000000000000000000000000000000000000000000000000000000000029000000000000000000000000000000000000000000000001c9f78d2893e40000
							</div>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Logs:</div>
						<div className="od-col">
							<div className="mono">
								<div className="mono-bold">Log [0]:</div>
								<div className="mono-bold">Contract: <Link to="/">1.15.3</Link></div>
								<div className="mono-bold">Topics:</div>
								<div>[0]:ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef</div>
								<div>[1]:0000000000000000000000000000000000000000000000000000000000000000</div>
								<div>[2]:000000000000000000000000000000000000000000000000000000000000001e</div>
							</div>
							<button className="text-button">View full log</button>
						</div>
					</div>
				</div>

			</div>
		);
	}

}


OperationInfo.propTypes = {};

export default OperationInfo;
