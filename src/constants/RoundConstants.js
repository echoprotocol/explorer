export const ROUND_STARTED = 'round_started';
export const BLOCK_PRODUCED = 'block_produced';
export const GC_STARTED = 'gc_started';
export const BBA_STARTED = 'bba_started';
export const DONE = 'done';

export const rounderSteps = {
	[ROUND_STARTED]: {
		step: 0,
		progress: 30,
		producing: 'progress',
		verifying: 'progress',
		timer: true,
	},
	[BLOCK_PRODUCED]: {
		step: 1,
	},
	[GC_STARTED]: {
		step: 2,
		progress: 50,
		producing: 'done',
		verifying: 'progress',
	},
	[BBA_STARTED]: {
		step: 3,
		progress: 80,
		producing: 'done',
		verifying: 'done',
	},
	[DONE]: {
		step: 4,
		progress: 100,
		producing: 'done',
		verifying: 'done',
	},
	totalStep: 3,
};
