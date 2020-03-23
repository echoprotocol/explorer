const BN = require('bignumber.js');
const { serialize } = require('json-immutable');

const t = new BN(1);

console.log('t ', t);
const t2 = serialize(t);


console.log(t2);
