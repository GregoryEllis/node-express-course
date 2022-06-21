// myApp

// With dependencies you have to install them first before you are to use them.

const _ = require('lodash');

const items = [1, [2, [3, [4]]]]
const newItems = _.flattenDeep(items);
console.log(newItems);
console.log('hello world')