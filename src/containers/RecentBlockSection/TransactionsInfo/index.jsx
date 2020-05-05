import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import TransactionInfo from '../../../components/TransactionInfo';
import TransactionActions from '../../../actions/TransactionActions';
import GlobalActions from '../../../actions/GlobalActions';
import { getBlockInformation } from '../../../actions/BlockActions';

export default withRouter(connect(
	(state) => ({
		operations: state.transaction.get('operations'),
		history: state.global.get('history'),
		blockInformation: state.block.get('blockInformation'),
		loading: state.transaction.get('loading'),
	}),
	(dispatch) => ({
		getTransaction: (round, index, virtual) => dispatch(TransactionActions.getTransaction(round, index, virtual)),
		clearTransaction: () => dispatch(TransactionActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		getBlockInfo: (round) => dispatch(getBlockInformation(round)),
	}),
)(TransactionInfo));
