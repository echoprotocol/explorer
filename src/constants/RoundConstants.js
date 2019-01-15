export const ROUND_STARTED = 'round_started';
export const BLOCK_PRODUCED = 'block_produced';
export const GC_STARTED = 'gc_started';
export const BBA_STARTED = 'bba_started';

export const rounderSteps = {
	[ROUND_STARTED]: {
		progress: 30,
		producing: 'progress',
		verifying: 'progress',
		timer: true,
	},
	[BLOCK_PRODUCED]: 1,
	[GC_STARTED]: {
		progress: 50,
		producing: 'done',
		verifying: 'progress',
	},
	[BBA_STARTED]: {
		progress: 80,
		producing: 'done',
		verifying: 'done',
	},
};
