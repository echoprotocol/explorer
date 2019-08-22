# Echo Explorer

Echo Explorer - https://explorer.echo.org

## Features

- Browse blocks
- View:
    * block details
    * transaction details
    * accounts (general information, balances and history)
    * assets
    * contracts (general information, balances and history)
    * raw objects
- Search by:
    * block number
    * account id or name
    * asset id or symbol
    * contract id
- Verify contracts
- Upload ABI
- Edit contract name, description and icon

## Installation Prerequisites

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.x.x or higher is required.

## Install Echo Explorer from github source

Use the following steps to install the explorer from github source:

Clone the git repository:

```bash
git clone https://github.com/echoprotocol/explorer.git
```

Go into the repository:

```bash
cd explorer
```

Use the package manager [npm](https://www.npmjs.com/) to install dependencies:

```bash
npm install
```

## Starting Development

To work locally, install the [Explorer Server](https://github.com/echoprotocol/explorer-server.git) and [EchoDB](https://github.com/echoprotocol/echodb.git)

Then create `local.json` in `config` folder and configurate environment:

`SERVER_URL` - [Explorer Server API](https://github.com/echoprotocol/explorer-server.git)
`GRAPHQL_URL.HTTP` - [EchoDB API](https://github.com/echoprotocol/echodb.git)
`GRAPHQL_URL.WS` - [websocket EchoDB API](https://github.com/echoprotocol/echodb.git)


This starts the process in development mode and starts a webpack dev server:

```bash
npm start
```

This will launch the Echo Explorer at http://localhost:8080

## Building Echo Explorer for Production

If you want builds the explorer for production to the `build` folder run this command:

```bash
npm run build
```

It correctly bundles Echo Explorer in production mode and optimizes the build for the best performance

## Lint

To [lint](https://eslint.org/) your `*.js` and `*.jsx` files run this command:

```bash
npm run lint
```

## Contributing

Read our [Contributing Guide](https://github.com/echoprotocol/explorer/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements.

## License

The MIT License (MIT)

Copyright (c) ECHO DEVELOPMENT LTD

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
