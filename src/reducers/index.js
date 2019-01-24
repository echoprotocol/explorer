import modalReducer from './ModalReducer';
import globalReducer from './GlobalReducer';
import formReducer from './FormReducer';
import gridReducer from './GridReducer';
import roundReducer from './RoundReducer';
import blockReducer from './BlockReducer';
import transactionReducer from './TransactionReducer';
import objectsReducer from './ObjectsReducer';
import searchReducer from './SearchReducer';
import accountReducer from './AccountReducer';

export default {
	modal: modalReducer.reducer,
	global: globalReducer.reducer,
	form: formReducer.reducer,
	grid: gridReducer.reducer,
	round: roundReducer.reducer,
	block: blockReducer.reducer,
	transaction: transactionReducer.reducer,
	objects: objectsReducer.reducer,
	account: accountReducer.reducer,
	search: searchReducer.reducer,
};
