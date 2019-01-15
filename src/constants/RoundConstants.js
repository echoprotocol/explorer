export const ROUND_STARTED = 'round_started';
export const BLOCK_PRODUCED = 'block_produced';
export const GC_STARTED = 'gc_started';
export const BBA_STARTED = 'bba_started';
export const DONE = 'done';

export const rounderSteps = {
	[ROUND_STARTED]: {
		step: 0,
		title: 'Producing block',
		progress: 30,
		producing: 'progress',
		verifying: 'progress',
		timer: true,
	},
	[BLOCK_PRODUCED]: {
		step: 1,
		title: 'Producing block',
	},
	[GC_STARTED]: {
		step: 2,
		title: 'Verifying block: GC',
		progress: 50,
		producing: 'done',
		verifying: 'progress',
	},
	[BBA_STARTED]: {
		step: 3,
		title: 'Verifying block: BBA',
		progress: 80,
		producing: 'done',
		verifying: 'done',
	},
	[DONE]: {
		step: 3,
		title: 'Verifying block: BBA',
		progress: 100,
		producing: 'done',
		verifying: 'done',
	},
	totalStep: 3,
};
