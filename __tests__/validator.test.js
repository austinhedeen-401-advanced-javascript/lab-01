'use strict';

const validator = require('../lib/validator.js');

describe('simple numeric validation', () => {
  describe('#isNegative', () => {
    test('regular cases', () => {
      expect(validator.isNegative(-1)).toEqual(true);
      expect(validator.isNegative(0)).toEqual(false);
    });
  });
});

describe('validator module performs basic validation of', () => {
  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const bool = false;
  const func = () => {};

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeFalsy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(bool)).toBeFalsy();
    expect(validator.isObject(func)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
    expect(validator.isBoolean(func)).toBeFalsy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(bool)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
  });
});

describe('#isNumberValid', () => {
  const one = 1;
  const negOne = -1;
  const zero = 0;

  test('rule: positive', () => {
    expect(validator.isNumberValid(one, 'positive')).toEqual(true);
    expect(validator.isNumberValid(negOne, 'positive')).toEqual(false);
    expect(validator.isNumberValid(zero, 'positive')).toEqual(false);
  });

  test('rule: negative', () => {
    expect(validator.isNumberValid(one, 'negative')).toEqual(false);
    expect(validator.isNumberValid(negOne, 'negative')).toEqual(true);
    expect(validator.isNumberValid(zero, 'negative')).toEqual(false);
  });

  test('rule: zero', () => {
    expect(validator.isNumberValid(one, 'zero')).toEqual(false);
    expect(validator.isNumberValid(negOne, 'zero')).toEqual(false);
    expect(validator.isNumberValid(zero, 'zero')).toEqual(true);
  });

  test('non-number input', () => {
    expect(validator.isNumberValid('not a number', 'rule irrelevant')).toEqual(false);
  });

  test('unexpected rule', () => {
    expect(validator.isNumberValid(zero, 'unknown rule')).toEqual(false);
  });
});

// Jumping off the code review example...
describe('#isObjectValid', () => {
  const schema = {
    fields: {
      id: { type: 'string' },
      age: { type: 'number' },
      favoriteToys: { type: 'object' },
    },
  };

  test('expected case', () => {
    expect(validator.isObjectValid({ id: 'kali', age: 2, favoriteToys: {} }, schema)).toEqual(true);
  });

  test('incorrect parameter types', () => {
    expect(validator.isObjectValid([], schema)).toEqual(false);
    expect(validator.isObjectValid({ id: 'kali', age: 2, favoriteToys: [] }, [])).toEqual(false);
  });

  test('missing fields', () => {
    expect(validator.isObjectValid({ age: 2, favoriteToys: {} }, schema)).toEqual(false);
    expect(validator.isObjectValid({ id: 'kali', favoriteToys: {} }, schema)).toEqual(false);
    expect(validator.isObjectValid({ id: 'kali', age: 2 }, schema)).toEqual(false);
  });

  test('incorrect field types', () => {
    expect(validator.isObjectValid({ id: 1, age: 2, favoriteToys: {} }, schema)).toEqual(false);
    expect(validator.isObjectValid({ id: 'kali', age: '2', favoriteToys: {} }, schema)).toEqual(false);
    expect(validator.isObjectValid({ id: 'kali', age: 2, favoriteToys: [] }, schema)).toEqual(false);
  });
});

/*

describe('validator module performs complex validations', () => {

  it('validates the presence of required object properties at any level', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair
    expect(validator.hasRequiredProperties(data, schema)).toBeFalsy();
  });

  it('validates the proper types of object properties', () => {
    // i.e. person.name must be a string, etc.
    expect(true).toBeFalsy();
  });

  it('validates the types of values contained in an array', () => {
    // i.e. an array of all strings or numbers
    expect(true).toBeFalsy();
  });

  it('validates a value array against an approved list', () => {
    // i.e. a string might only be allowed to be "yes" or "no"
    expect(true).toBeFalsy();
  });

  // TODO: Cover so, so many more cases

});
*/
