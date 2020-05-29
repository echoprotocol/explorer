import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Asset from '../../components/Asset';
import {
	getFullAssetInformation,
	getAssetTransfers,
	getAssetTransfersHistoryWithInterval,
} from '../../actions/AssetActions';
import GlobalActions from '../../actions/GlobalActions';
import GridActions from '../../actions/GridActions';
import { ASSET_GRID } from '../../constants/TableConstants';

export default withRouter(connect(
	(state) => ({
		isMobile: state.global.get('isMobile'),
		assetTransfers: state.asset.get('history'),
		transferHistoryWithInterval: state.asset.get('transferHistoryWithInterval'),
		filterAndPaginateData: state.grid.get(ASSET_GRID),
	}),
	(dispatch) => ({
		getAssetInfo: (id) => dispatch(getFullAssetInformation(id)),
		loadAssetHisotry: (id) => dispatch(getAssetTransfers(id)),
		getAssetTransfersHistoryWithInterval: (id) => dispatch(getAssetTransfersHistoryWithInterval(id)),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		onChangeFilter: (filters) => dispatch(GridActions.initData(ASSET_GRID, filters)),
		initData: (params) => dispatch(GridActions.initData(ASSET_GRID, params)),
		setTotalDataSize: (size) => dispatch(GridActions.setTotalDataSize(ASSET_GRID, size)),
	}),
)(Asset));
