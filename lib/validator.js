'use strict';

const validator = {};

validator.isNegative = (input) => input < 0;
validator.isString = (input) => typeof input === 'string';
validator.isNumber = (input) => typeof input === 'number';
validator.isArray = (input) => Array.isArray(input);
validator.isObject = (input) => typeof input === 'object' && !Array.isArray(input);
validator.isBoolean = (input) => typeof input === 'boolean';
validator.isFunction = (input) => typeof input === 'function';

validator.isObjectValid = (input, schema) => {
  // input and schema must be objects
  if (!validator.isObject(input) || !validator.isObject(schema)) {
    return false;
  }
  // Test for valid schema
  if (!Object.prototype.hasOwnProperty.call(schema, 'fields')) {
    return false;
  }

  // Test input for valid fields
  Object.keys(schema.fields).forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(input, field)) {
      return false;
    }

    const expectedType = schema.fields[field].type;
    const fieldType = Array.isArray(input[field]) ? 'array' : typeof input[field];
    return fieldType === expectedType;
  });

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

  switch (rules) {
    case 'positive':
      return input > 0;
    case 'negative':
      return input < 0;
    case 'zero':
      return input === 0;
    default:
      return false;
  }
};

module.exports = validator;
