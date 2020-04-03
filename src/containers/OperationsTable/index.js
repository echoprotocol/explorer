import { connect } from 'react-redux';

import OperationsTable from '../../components/OperationsTable/index.new';
import GridActions from '../../actions/GridActions';

export default connect(
	(state, props) => ({
		filterAndPaginateData: state.grid.get(props.gridName),
	}),
	(dispatch, props) => ({
		onChangeCurrentPage: (value) => dispatch(GridActions.setPage(props.gridName, value)),
		onChangeSizePerPage: (value) => dispatch(GridActions.setPageSize(props.gridName, value)),
	}),
)(OperationsTable);
