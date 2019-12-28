/* eslint-disable import/prefer-default-export */

export const loadScript = (src) => new Promise((resolve, reject) => {
	const findScript = [...document.scripts].find((script) => script.src === src);
	if (findScript) {
		console.log('findScript', findScript);
		return resolve();
	}
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
