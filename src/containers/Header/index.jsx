import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchActions from '../../actions/SearchActions';

import PreparingSection from '../PreparingSection';
import Header from '../../components/Header';

const HeaderContainer = React.memo(({
	hints, getHints, loadingSearch, errorSearch,
	latestBlock, blocks, stepProgress, preparingBlock,
	operationCountRates, operationCount,
}) => (
	<div className="top-section">
		<div className="wrap">
			<Header
				errorSearch={errorSearch}
				loadingSearch={loadingSearch}
				hints={hints}
				getHints={getHints}
			/>
			<PreparingSection
				blocks={blocks}
				stepProgress={stepProgress}
				preparingBlock={preparingBlock}
				latestBlock={latestBlock}
				operationCountRates={operationCountRates}
				operationCount={operationCount}
			/>
		</div>
	</div>
));


HeaderContainer.propTypes = {
	hints: PropTypes.array.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string.isRequired,
	getHints: PropTypes.func.isRequired,
	blocks: PropTypes.object.isRequired,
	stepProgress: PropTypes.string.isRequired,
	preparingBlock: PropTypes.number.isRequired,
	latestBlock: PropTypes.number.isRequired,
	operationCountRates: PropTypes.array.isRequired,
	operationCount: PropTypes.number.isRequired,
};

export default withRouter(connect(
	(state) => ({
		hints: state.search.getIn(['headerSearch', 'hints']),
		errorSearch: state.search.getIn(['headerSearch', 'error']),
		loadingSearch: state.search.getIn(['headerSearch', 'loading']),
		blocks: state.block.get('blocks'),
		stepProgress: state.round.get('stepProgress'),
		preparingBlock: state.round.get('preparingBlock'),
		latestBlock: state.round.get('latestBlock'),
		operationCountRates: state.statistics.get('operationCountRates'),
		operationCount: state.statistics.get('operationCount'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)(HeaderContainer));
