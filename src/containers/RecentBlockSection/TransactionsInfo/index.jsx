import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TransactionInfo from '../../../components/TransactionInfo';
import TransactionActions from '../../../actions/TransactionActions';
import GlobalActions from '../../../actions/GlobalActions';
import { getBlockInformation } from '../../../actions/BlockActions';


export default withRouter(connect(
	(state) => ({
		operations: state.transaction.get('operations'),
		historyLength: state.global.get('historyLength'),
		blockInformation: state.block.get('blockInformation'),
	}),
	(dispatch, props) => ({
		getTransaction: () => dispatch(TransactionActions.getTransaction(
			props.match.params.round,
			props.match.params.index,
		)),
		clearTransaction: () => dispatch(TransactionActions.clear()),
		setTitle: (title) => dispatch(GlobalActions.setTitle(title)),
		getBlockInfo: (round = props.match.params.round) => dispatch(getBlockInformation(round)),
	})
	,
)(TransactionInfo));
