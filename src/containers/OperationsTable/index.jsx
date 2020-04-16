import { connect } from 'react-redux';

import OperationsTable from '../../components/OperationsTable';
import GridActions from '../../actions/GridActions';

export default connect(
	(state, props) => ({
		filterAndPaginateData: state.grid.get(props.gridName),
		isMobile: state.global.get('isMobile'),
	}),
	(dispatch, props) => ({
		initData: (params) => dispatch(GridActions.initData(props.gridName, params)),
		onChangeFilter: (params) => dispatch(GridActions.setFilter(props.gridName, params)),
	}),
)(OperationsTable);
