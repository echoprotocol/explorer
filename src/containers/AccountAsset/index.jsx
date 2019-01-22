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
							<div className="account-page-t-block">
								<div className="title">Account <span className="accent">1.16.1231</span></div>
								<div className="help-container">
									<div className="left-card">
										<div className="line">
											<div className="title">Account name</div>
											<div className="val">Homer1956</div>
										</div>
										<div className="line">
											<div className="title">Echo balance</div>
											<div className="val"><span className="txt">234.055432</span><span className="accent">ECHO</span></div>
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
