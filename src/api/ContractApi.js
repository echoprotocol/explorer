/* eslint-disable import/prefer-default-export */

export const loadScript = (src) => new Promise(async (resolve, reject) => {
	const findScript = [...document.scripts].find((script) => script.src === src);
	if (findScript) {
		return resolve();
	}

	// const response = await fetch(src);
	// const total = Number(response.headers.get('content-length'));
	// console.log('total', total);
	//
	// const reader = response.body.getReader();
	// let bytesReceived = 0;
	//
	// const div = document.createElement('div');
	// console.log('div', div);
	//
	// while (true) {
	// 	const result = await reader.read();
	// 	if (result.done) {
	// 		console.log('Fetch complete');
	// 		break;
	// 	}
	// 	bytesReceived += result.value.length;
	// 	console.log('Received', bytesReceived, 'bytes of data so far');
	// }

	const script = document.createElement('script');
	script.async = true;
	script.src = src;
	console.log('src', src);

	script.onerror = () => {
		reject(new Error(`Failed to load${src}`));
	};

	script.onload = () => {
		resolve();
	};

	if (window.Module) {
		window.Module = undefined;
	}

	console.log('script', script);

	document.getElementsByTagName('head')[0].appendChild(script);
	return null;
});
