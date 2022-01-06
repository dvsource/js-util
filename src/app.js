const partialMatch = require('./lib/compare-helper');

console.log(partialMatch({ a: 1, b: 'X' }, { a: 2 }, 'ALLOW_ANY'));
console.log(partialMatch({ a: 2, b: 'X' }, { a: 2, c: true }, 'ALLOW_ANY'));
console.log(partialMatch({ a: 2, b: 'X' }, { a: 2 }, 'ALLOW_ANY'));
