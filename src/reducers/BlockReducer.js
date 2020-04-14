import { createModule } from 'redux-modules';
import { Map, OrderedMap } from 'immutable';
import _ from 'lodash';
import TransformModules from '../utils/TransformModules';
import { PAGE_BLOCKS_COUNT } from '../constants/GlobalConstants';

const DEFAULT_FIELDS = Map({
	error: '',
	blockInformation: new Map({}),
	blocks: new OrderedMap({}),
	blocksCount: PAGE_BLOCKS_COUNT,
	loading: false,
	startTimestamp: 0,
	hasMore: true,
	isDistributionRewardOpen: false,
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
