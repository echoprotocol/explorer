import { connect } from 'react-redux';

import OperationsTable from '../../components/OperationsTable';
import GridActions from '../../actions/GridActions';

export default connect(
	(state, props) => ({
		filterAndPaginateData: state.grid.get(props.gridName),
	}),
	(dispatch, props) => ({
		onChangeFilter: (params) => dispatch(GridActions.setFilter(props.gridName, params)),
		onChangeCurrentPage: (value) => dispatch(GridActions.setPage(props.gridName, value)),
		onChangeSizePerPage: (value) => dispatch(GridActions.setPageSize(props.gridName, value)),
	}),
)(OperationsTable);
