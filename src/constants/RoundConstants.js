export const ROUND_STARTED = 'round_started';
export const BLOCK_PRODUCED = 'block_produced';
export const GC_STARTED = 'gc_started';
export const BBA_STARTED = 'bba_started';
export const BLOCK_APPLIED_CALLBACK = 'block_applied_callback';

export const PRODUCING_TIP = 'On this stage, the system choose accounts who will propose the next block and wait for this block from selected producers';
export const GC_TIP = 'This is the first round of consensus - Graded Consensus. Nodes who were chosen by the system for verifying block choose the best candidate';
export const BBA_TIP = 'Chosen verifiers should reach an agreement to apply the new block';

export const rounderSteps = {
	[ROUND_STARTED]: {
		status: ROUND_STARTED,
		title: 'Waiting for proposals',
	},
	[BLOCK_PRODUCED]: {
		status: BLOCK_PRODUCED,
	},
	[GC_STARTED]: {
		status: GC_STARTED,
		title: 'Verifying block: GC',
	},
	[BBA_STARTED]: {
		status: BBA_STARTED,
		title: 'Verifying block: BBA',
	},
	[BLOCK_APPLIED_CALLBACK]: {
		status: BLOCK_APPLIED_CALLBACK,
		title: 'Produced',
	},
};

export const GC_START_DELAY = 800;
export const PRODUCED_DELAY = 1000;

export const PROGRESS_STATUS = 'progress';
export const DONE_STATUS = 'done';
