'use strict';

// Vinicio - this is similar to module.exports = {};, but you are giving it an easier to use name
let validator = module.exports = {};

validator.isLessThanZero = input => input < 0;

validator.isFunction = input => typeof input === 'function';


/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */


// Ideas for rules : Positive values / Negative values / odd values / even values /
// specific values / bigger than five /

// if you need to setup more complex rules, remember that rules can be an object too
validator.isValid = (input, rules) => {
  // return true;
  if(rules === 'object') {
    // Vinicio - how do I check if the type of the input is an object
  }

  if(rules === 'object') {
    // I'm checking if the value is less than zero, because the user wants to
    // check if the value is negative
    return input < 0;
  }

  if(rules === 'one') {
    // I'm checking if the value is less than zero, because the user wants to
    // check if the value is negative
    return input === 1;
  }

};

/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};


