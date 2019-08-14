'use strict';

let validator = module.exports = {};

validator.isNegative = input => input < 0;
validator.isString = input => typeof input === 'string';
validator.isNumber = input => typeof input === 'number';
validator.isArray = input => Array.isArray(input);
validator.isObject = input => typeof input === 'object' && !Array.isArray(input);
validator.isBoolean = input => typeof input === 'boolean';
validator.isFunction = input => typeof input === 'function';

validator.isObjectValid = (input, schema) => {
  // input and schema must be objects
  if (!validator.isObject(input) || !validator.isObject(schema)) {
    return false;
  }
  // Test for valid schema
  if (!schema.hasOwnProperty('fields')) {
    return false;
  }

  // Test input for valid fields
  for (let field of Object.keys(schema.fields)) {
    if (!input.hasOwnProperty(field)) {
      return false;
    }

    const expectedType = schema.fields[field].type;
    const fieldType = Array.isArray(input[field]) ? 'array' : typeof input[field];
    if (fieldType !== expectedType) {
      return false;
    }
  }

  return true;
};

/**
 * Based on a set of rules, is the input valid?
 * @param input {number}
 * @param rules {string} - rule to validate, among ['positive', 'negative', 'zero']
 * @returns {boolean}
 */
validator.isNumberValid = (input, rules) => {
  if (!validator.isNumber(input)) {
    return false;
  }

  if(rules === 'positive') {
    return input > 0;
  }

  if(rules === 'negative') {
    return input < 0;
  }

  if(rules === 'zero') {
    return input === 0;
  }

  // Unknown rule
  return false;

  /* I almost want to use a switch statement, if I didn't dislike them so much.
  switch(rules) {
    case 'positive':
      return input > 0;
    case 'negative':
      return input < 0;
    case 'zero':
      return input === 0;
    default:
      return false;
  }
  */
};

