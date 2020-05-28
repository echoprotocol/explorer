import { createModule } from 'redux-modules';
import { List, Map, OrderedMap } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';
import { PAGE_BLOCKS_COUNT } from '../constants/GlobalConstants';

const DEFAULT_FIELDS = Map({
	error: '',
	blockInformation: new Map({}),
	blocks: new OrderedMap({}),
	blocksOnTable: new OrderedMap({}),
	blocksCount: PAGE_BLOCKS_COUNT,
	loading: false,
	isDistributionRewardOpen: false,
	filteredOperations: new List([]),
	latestOperations: [],
});

export default createModule({
	name: 'block',
	initialState: _.cloneDeep(DEFAULT_FIELDS),
	transformations: {
		..._.cloneDeep(TransformModules(DEFAULT_FIELDS)),
		set: {
			reducer: (state, { payload }) => {
				state = state.set(payload.field, payload.value);

				return state;
			},
		},
	},
});
