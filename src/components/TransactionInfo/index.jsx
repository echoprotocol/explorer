import React from 'react';
import PropTypes from 'prop-types';

import { INDEX_PATH, BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';

import FormatHelper from '../../helpers/FormatHelper';
import BreadCrumbs from '../../components/InformationBreadCrumbs';
import BackwardsLink from '../BackwardLink';
import InnerHeader from '../InnerHeader';
import Loader from '../Loader';

import OperationsTable from '../OperationsTable';

class TransactionsInfo extends React.Component {

	componentDidMount() {
		const { round, index } = this.props.match.params;

		this.props.setTitle(TITLE_TEMPLATES.TRANSACTION.replace(/index/, index).replace(/round/, round));
		this.props.getBlockInfo(round);
		this.props.getTransaction();
	}

	componentWillUnmount() {
		this.props.clearTransaction();
	}

	returnFunction() {
		if (!this.props.historyLength) {
			this.props.history.push(BLOCK_INFORMATION_PATH.replace(/:round/, this.props.match.params.round));
		} else {
			this.props.history.goBack();
		}
	}

	renderLoader(loading) {
		return loading ? <Loader /> : null;
	}

	render() {
		const { round, index } = this.props.match.params;

		const {
			operations, blockInformation, loading, history, location,
		} = this.props;

		const breadcrumbs = [
			{
				title: 'Blocks list',
				path: INDEX_PATH,
			},
			{
				title: `Block ${FormatHelper.formatAmount(round, 0)}`,
				path: BLOCK_INFORMATION_PATH.replace(/:round/, round),
			},
		];

		const timeBlockCreated = FormatHelper.timestampToBlockCreationTime(blockInformation.get('time'));

		return (
			<div className="inner-container">
				<InnerHeader title={`Transaction ${index} in Block ${FormatHelper.formatAmount(round, 0)}`}>
					<BackwardsLink returnFunction={() => this.returnFunction()} />
					<BreadCrumbs breadcrumbs={breadcrumbs} />
				</InnerHeader>
				{ !loading ?
					<React.Fragment>
						<p className="description-text">{`Block has been created ${timeBlockCreated.date} ${timeBlockCreated.time}`}</p>
						<OperationsTable
							label={FormatHelper.getFormaOperationsTitle(operations.size)}
							isTransaction
							operations={operations}
							history={history}
							location={location}
							loading={loading}
							changeUrl
						/>
					</React.Fragment> : this.renderLoader(loading)
				}
			</div>
		);
	}

}

TransactionsInfo.propTypes = {
	loading: PropTypes.bool,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	operations: PropTypes.object,
	historyLength: PropTypes.number,
	getTransaction: PropTypes.func.isRequired,
	clearTransaction: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	getBlockInfo: PropTypes.func.isRequired,
	blockInformation: PropTypes.object.isRequired,
};

TransactionsInfo.defaultProps = {
	operations: null,
	historyLength: 0,
	loading: false,
};

export default TransactionsInfo;
