export const ROUND_STARTED = 'round_started';
export const BLOCK_PRODUCED = 'block_produced';
export const GC_STARTED = 'gc_started';
export const BBA_STARTED = 'bba_started';
export const DONE = 'done';

export const PRODUCING_TIP = 'On this stage, the system choose accounts who will propose the next block and wait for this block from selected producers';
export const GC_TIP = 'This is the first round of consensus - Graded Consensus. Nodes who were chosen by the system for verifying block choose the best candidate';
export const BBA_TIP = 'Chosen verifiers should reach an agreement to apply the new block';

export const rounderSteps = {
	[ROUND_STARTED]: {
		step: 1,
		progress: 0,
		maxProgress: 49,
		producing: 'progress',
		verifying: 'progress',
		timer: true,
		title: 'Producing block',
	},
	[BLOCK_PRODUCED]: {
		step: 1,
		title: 'Producing block',
	},
	[GC_STARTED]: {
		step: 2,
		progress: 50,
		maxProgress: 69,
		producing: 'done',
		verifying: 'progress',
		title: 'Verifying block: GC',
	},
	[BBA_STARTED]: {
		step: 3,
		progress: 98,
		maxProgress: 99,
		producing: 'done',
		verifying: 'done',
		title: 'Verifying block: BBA',
	},
	[DONE]: {
		step: 3,
		progress: 70,
		maxProgress: 100,
		producing: 'done',
		verifying: 'done',
		title: 'Verifying block: BBA',
	},
	totalStep: 3,
};

export const GC_START_DELAY = 800;

export const PROGRESS_STATUS = 'progress';
export const DONE_STATUS = 'done';
