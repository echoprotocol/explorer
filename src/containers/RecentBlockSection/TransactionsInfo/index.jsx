import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import TransactionInfo from '../../../components/TransactionInfo';
import TransactionActions from '../../../actions/TransactionActions';
import GlobalActions from '../../../actions/GlobalActions';
import { getBlockInformation } from '../../../actions/BlockActions';

export default withRouter(connect(
	(state) => ({
		operations: state.transaction.get('operations'),
		historyLength: state.global.get('historyLength'),
		blockInformation: state.block.get('blockInformation'),
		loading: state.transaction.get('loading'),
	}),
	(dispatch) => ({
		getTransaction: (round, index) => dispatch(TransactionActions.getTransaction(round, index)),
		clearTransaction: () => dispatch(TransactionActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		getBlockInfo: (round) => dispatch(getBlockInformation(round)),
	}),
)(TransactionInfo));
