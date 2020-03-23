import { Helmet } from 'react-helmet';
import transit from 'transit-immutable-js';

export default function template(initialState = {}, content = '') {
	let scripts = '';
	const helmet = Helmet.renderStatic();

	if (content) {
		scripts = ` 
				<script>
                   window.PRELOADED_STATE = ${JSON.stringify(transit.toJSON(initialState))}
                </script>
 				<script type="text/javascript" src="/babel.js"></script>
 				<script type="text/javascript" src="/vendor.bundle.js"></script>
    			<script type="text/javascript" src="/app.js"></script>
         `;
	}
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
