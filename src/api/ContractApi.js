/* eslint-disable import/prefer-default-export */

export const loadScript = (src) => new Promise((resolve, reject) => {
	const script = document.createElement('script');
	script.async = true;
	script.src = src;

	script.onerror = () => {
		reject(new Error(`Failed to load${src}`));
	};

	script.onload = () => {
		resolve();
	};

	if (window.Module) {
		window.Module = undefined;
	}

	document.getElementsByTagName('head')[0].appendChild(script);
});
