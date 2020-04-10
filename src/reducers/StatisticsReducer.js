import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import _ from 'lodash';

import TransformModules from '../utils/TransformModules';

const DEFAULT_FIELDS = new Map({
	assets: null,
	delegationRate: 0,
	delegationRates: [],
	decentralizationRate: 0,
	decentralizationRates: [],
});

export default createModule({
	name: 'statistics',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
	},
});
