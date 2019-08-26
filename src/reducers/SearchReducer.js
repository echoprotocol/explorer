import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = Map({
	headerSearch: Map({
		hints: [],
		error: '',
		loading: false,
	}),
	blockSearch: Map({
		hints: [],
		error: '',
		loading: false,
	}),
});

export default createModule({
	name: 'search',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
	},
});
