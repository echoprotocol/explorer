import { Helmet } from 'react-helmet';
import { serialize } from 'json-immutable';

export default function template(initialState = {}, content = '') {
	const helmet = Helmet.renderStatic();

	let serializedInitialState = '';
	try {
		serializedInitialState = serialize(initialState);
	} catch (err) {
		console.log(`Error transform from immutable object to simple JSON: ${err}`);
	}
	try {
		serializedInitialState = JSON.stringify(serializedInitialState);
	} catch (err) {
		console.log(`Error stringify initial state: ${err}`);
	}

	const scripts = ` 
		<script>
		   window.__PRELOADED_STATE__ = ${serializedInitialState}
		</script>
		<script type="text/javascript" src="/babel.js"></script>
		<script type="text/javascript" src="/vendor.bundle.js"></script>
		<script type="text/javascript" src="/app.js"></script>
	`;
	const page = `<!doctype html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                 ${helmet.title.toString()}
                 ${helmet.meta.toString()}
                 ${helmet.link.toString()}
              	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              	<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
                <link href="/vendor.css" rel="stylesheet">
                <link href="/app.css" rel="stylesheet">
              </head>
              <body>
				<div id="root">${content}</div>	
				 ${scripts}
              </body>
		  </html>
        `;

	return page;
}
