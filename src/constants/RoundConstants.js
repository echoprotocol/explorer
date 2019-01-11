const rounderSteps = {
	round_started: {
		progress: 30,
		producing: 'progress',
		verifying: 'progress',
		timer: true,
	},
	block_produced: 1,
	gc_started: {
		progress: 50,
		producing: 'done',
		verifying: 'progress',
	},
	bba_started: {
		progress: 80,
		producing: 'done',
		verifying: 'done',
	},
};

export default rounderSteps;
