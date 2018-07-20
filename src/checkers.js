/**
 * @module Checkers
 * @description Groups type/structure checkers
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import Regexp from './regexps';

/**
 * Check if value is object
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isObject = value => typeof value == 'object' && value !== null;

/**
 * Check if value is null or undefined
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isNull = value => value === null;

/**
 * Check if value is a function
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isFunction = value => typeof value == 'function';

/**
 * Check if value is string
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isString = value => typeof value == 'string';

/**
 * Check if value is boolean
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = value => typeof value == 'boolean';

/**
 * Check if value is defined
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isDefined = value => typeof value != 'undefined';

/**
 * Check if value is a number
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isNumber = value => typeof value == 'number';

/**
 * Check if value is an integer
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isInteger = value => isNumber(value) && Number.isInteger(value);

/**
 * Check if value is a float
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isFloat = value => isNumber(value) && !Number.isInteger(value);

/**
 * Check if value is an array
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isArray = value => Array.isArray(value);

/**
 * Check value is a promisse
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isPromise = value => isObject(value) && `${value}` == '[object Promise]';

/**
 * Check if value is an email
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isEmail = value => isString(value) && Regexp.email.test(value.trim());

/**
 * Check if value is a Date
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isDate = value =>
  isObject(value) && `${value.constructor}` == 'function Date() { [native code] }';

/**
 * Check if value is a regular expression
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isRegExp = value =>
  isObject(value) && `${value.constructor}` == 'function RegExp() { [native code] }';

/**
 * Check if value is a plain object
 *
 * @param {*} value
 * @returns {Boolean}
 */
const isPlainObject = (value) => {
  if (isNull(value) || !isDefined(value)) return false;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

/** Check if value is empty */

// eslint-disable-next-line consistent-return
const isEmpty = (value) => {
  // null or undefined
  if (isNull(value) || !isDefined(value)) return true;

  // Arrays or strings
  if (isArray(value) || isString(value)) return value.length === 0;

  // Numbers,  booleans, functions and Promises
  if (isNumber(value) || isBoolean(value) || isFunction(value) || isPromise(value)) return false;

  // Objects
  return Object.entries(value).length === 0;
};

/** @export Checkers */
export default {
  isArray,
  isBoolean,
  isDate,
  isDefined,
  isEmail,
  isEmpty,
  isFloat,
  isFunction,
  isInteger,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isString,
};
