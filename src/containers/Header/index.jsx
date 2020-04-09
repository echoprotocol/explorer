import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import searchActions from '../../actions/SearchActions';

import PreparingSection from '../PreparingSection';
import Header from '../../components/Header';

const HeaderContainer = React.memo(({
	history, hints, getHints, loadingSearch, errorSearch, pathName,
	latestBlock, blocks,
}) => (
	<div className="top-section">
		<div className="wrap">
			<Header
				errorSearch={errorSearch}
				loadingSearch={loadingSearch}
				hints={hints}
				history={history}
				getHints={getHints}
				pathName={pathName}
			/>
			<PreparingSection
					blocks={blocks}
					latestBlock={latestBlock}
			/>
		</div>
	</div>
));


HeaderContainer.propTypes = {
	pathName: PropTypes.string.isRequired,
	history: PropTypes.object.isRequired,
	hints: PropTypes.array.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	errorSearch: PropTypes.string.isRequired,
	getHints: PropTypes.func.isRequired,
	blocks: PropTypes.object.isRequired,
	latestBlock: PropTypes.number.isRequired,
};

export default withRouter(connect(
	(state) => ({
		pathName: state.router.location.pathname,
		hints: state.search.getIn(['headerSearch', 'hints']),
		errorSearch: state.search.getIn(['headerSearch', 'error']),
		loadingSearch: state.search.getIn(['headerSearch', 'loading']),
		blocks: state.block.get('blocks'),
		latestBlock: state.round.get('latestBlock'),
	}),
	(dispatch) => ({
		getHints: (str) => dispatch(searchActions.headerSearchHint(str)),
	}),
)(HeaderContainer));
