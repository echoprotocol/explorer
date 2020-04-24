const { default: echo, PrivateKey, constants } = require('echojs-lib');
const util = require('util');
const account = '1.2.26'
const privateKey = PrivateKey.fromWif('5K9VVTEUYevvwEhZfRYDWckh59tRkTeXrDzbzDJ2KyD8doKrGJT');
const url = 'wss://testnet.echo-dev.io/ws';
echo.connect(url, { connectionTimeout: 30000 }).then(async() => {
    // const tx = echo.createTransaction();
    // const options = {
    //     from: account,
    //     to: '1.2.1',
    //     amount: {
    //         asset_id: '1.3.0',
    //         amount: 1,
    //     },
    //     extensions: [],
    // };
    // tx.addOperation(constants.OPERATIONS_IDS.TRANSFER, options);
    // tx.addSigner(privateKey);
    // await tx.sign();
    // await tx.broadcast();
    // const a = await echo.api.getAccountHistory('1.2.12', '1.6.0', 100)
    // console.log(a[a.length - 6].op);
    console.log(util.inspect(await echo.api.getObject('1.5.1'), false, null, true));
    // console.log(await echo.api.getFullAccounts(['1.2.1']));
    const block = 306;
    const op = 50;

    // console.log(util.inspect(await echo.api.getBlock(block), false, null, true));
    console.log(((await echo.api.getBlock(block)).transactions.filter(({ operations }) => operations.filter(([id]) => id === op).length))[0].operation_results)
    console.log(((await echo.api.getBlock(block)).transactions.filter(({ operations }) => operations.filter(([id]) => id === op).length))[0].operations)
}).catch((e) => console.log(e))