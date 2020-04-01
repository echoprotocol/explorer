import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FormatHelper from '../../helpers/FormatHelper';

import BlockReducer from '../../reducers/BlockReducer';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import GlobalActions from '../../actions/GlobalActions';
import SearchActions from '../../actions/SearchActions';
import { BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import LatestBlocksTable from './LatestBlocksTable';
import LatestOperationsTable from './LatestOperationsTable';

class MainPage extends React.Component {

	constructor() {
		super();
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.props.setTitle(TITLE_TEMPLATES.MAIN);
	}

	componentDidUpdate(prevProps) {
		if (this.state.loading && prevProps.hints !== this.props.hints && this.props.hints.length) {
			this.transitionToBlock();
		}
	}

	getBlocks() {
		const { blocks } = this.props;
		const blocksResult = [];

		blocks.mapEntries(([key, value]) => {
			blocksResult.push({
				round: key,
				blockNumber: FormatHelper.formatAmount(key, 0),
				time: value.get('time'),
				producer: value.get('producer'),
				producerId: value.get('producerId'),
				reward: value.get('reward'),
				rewardCurrency: value.get('rewardCurrency'),
				weight: FormatHelper.formatBlockSize(value.get('weight')),
				weightSize: FormatHelper.formatByteSize(value.get('weight')),
				transactions: value.get('transactions'),
			});
		});

		return blocksResult.sort((a, b) => {
			if (!a || !b) {
				return 0;
			}

			return b.round - a.round;
		});
	}

	setLoading() {
		this.setState({
			loading: true,
		});
	}

	goToBlock(e, block) {
		e.preventDefault();
		this.props.history.push(BLOCK_INFORMATION_PATH.replace(/:round/, block));
	}

	transitionToBlock() {
		const { errorSearch, hints: [hint] } = this.props;
		if (errorSearch) return;
		this.props.history.push(hint.to);
	}

	render() {
		return (
			<div className="main-page">
				<div className="wrap">
					<LatestBlocksTable
						goToBlock={(e, block) => this.goToBlock(e, block)}
						blocks={this.getBlocks()}
					/>
					<LatestOperationsTable />
				</div>
			</div>
		);
	}

}

MainPage.propTypes = {
	hints: PropTypes.array.isRequired,
	errorSearch: PropTypes.string.isRequired,
	blocks: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	setTitle: PropTypes.func.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hasMore: state.block.get('hasMore'),
		loading: state.block.get('loading'),
		hints: state.search.getIn(['blockSearch', 'hints']),
		errorSearch: state.search.getIn(['blockSearch', 'error']),
		loadingSearch: state.search.getIn(['blockSearch', 'loading']),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(SearchActions.blockSearchHint(str)),
		setValue: (field, value) => dispatch(BlockReducer.actions.set({ field, value })),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
	}),
)(MainPage));
