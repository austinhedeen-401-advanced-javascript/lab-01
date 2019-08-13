'use strict';

const validator = require('./lib/validator');


// Vinicio - add some code here to be able to use the module using console.log

console.log('I am going to test if a value is one');
console.log(validator.isValid(123123, 'one'));

console.log(validator.isValid('I am a negative value: -1', 'negative'));
