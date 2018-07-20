/**
 * @module Helpers
 * @description Groups helper functions
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import Checkers from './checkers';

/**
 * Classifies a value into a type and returns it.
 *
 * @param {*} value
 * @returns {String} type
 */
const getType = (value) => {
  if (!Checkers.isDefined(value)) return 'undefined';
  if (Checkers.isNull(value)) return 'null';
  if (Checkers.isArray(value)) return 'array';
  if (Checkers.isBoolean(value)) return 'boolean';
  if (Checkers.isDate(value)) return 'date';
  if (Checkers.isFloat(value)) return 'float';
  if (Checkers.isFunction(value)) return 'function';
  if (Checkers.isInteger(value)) return 'integer';
  if (Checkers.isPromise(value)) return 'promise';
  if (Checkers.isRegExp(value)) return 'regexp';
  if (Checkers.isString(value)) return 'string';
  return 'object';
};

/** @export Helpers */
export default {
  getType,
};
