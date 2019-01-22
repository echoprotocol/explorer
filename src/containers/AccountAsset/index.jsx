/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import LoadMoreBtn from '../../../components/LoadMoreBtn';
import RecentBlockSidebar from '../RecentBlockSection/RecentBlockSidebar';

import { INDEX_PATH, ACCOUNTS_PATH } from '../../constants/RouterConstants';

import { getBlockInformation, clearBlockInformation } from '../../actions/BlockActions';

class AccountAsset extends React.Component {

	constructor() {
		super();
		this.returnFunction = this.returnFunction.bind(this);
	}

	componentDidMount() {
		this.props.getBlockInfo();

	}

	componentWillUnmount() {
		this.props.clearBlockInfo();
	}

	returnFunction() {
		this.props.history.push(INDEX_PATH);
	}

	renderLoader() {
		// TODO loader
		return null;
	}

	renderBlockInfo(blockInformation) {
		let verifiers = blockInformation.get('verifiers');
		if (verifiers) {
			verifiers = verifiers.map((name) => ({ name, to: ACCOUNTS_PATH.replace(/:name/, name) }));
		}

		// const transactions = blockInformation.get('transactions');

		return (
			<React.Fragment>
				<div className="recent-block-section">
					<div className="wrap">
						<div className="table-container inner-information-container block-information account-asset-page">
							<div className="asset-container">
								<div className="title">Account <span className="accent">1.16.1231</span></div>
								<div className="help-container">
									<div className="asset-elem">
										<div className="title">Asset info</div>
										<div className="list">
											<div className="block">
												<div className="title">Account name</div>
												<a href="" className="val blue">Homer1956</a>
											</div>
											<div className="block">
												<div className="title">Precision</div>
												<div className="val">5</div>
											</div>
											<div className="block">
												<div className="title">Current supply</div>
												<div className="val">999999432.23342</div>
											</div>
											<div className="block">
												<div className="title">Max supply</div>
												<div className="val">100000000.00000</div>
											</div>
										</div>
									</div>
									<div className="asset-elem">
										<div className="title">FreePool info</div>
										<div className="list">
											<div className="block">
												<div className="title">Echo exchange rate</div>
												<a href="" className="val blue">10000000.000042</a>
											</div>
											<div className="block">
												<div className="title">Pool balance</div>
												<div className="val"><span className="txt">12.30349</span><a href="" className="blue">ECHO</a></div>
											</div>
											<div className="block">
												<div className="title">Unclaimed issuer Balance</div>
												<div className="val"><span className="txt">555555</span><span className="gray">E-ZSCH</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<RecentBlockSidebar />
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { blockInformation } = this.props;

		// return blockInformation.get('blockNumber') ? this.renderBlockInfo(blockInformation) : this.renderLoader();
		return this.renderBlockInfo(blockInformation);
	}

}

AccountAsset.propTypes = {
	blockInformation: PropTypes.object.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	clearBlockInfo: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(connect(
	(state) => ({
		blockInformation: state.block.get('blockInformation'),
	}),
	(dispatch, props) => ({
		getBlockInfo: () => dispatch(getBlockInformation(props.match.params.round)),
		clearBlockInfo: () => dispatch(clearBlockInformation()),
	})
	,
)(AccountAsset));
