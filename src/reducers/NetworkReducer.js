import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = new Map({
	peers: [],
});

export default createModule({
	name: 'network',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
	},
});
