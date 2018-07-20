/**
 * @module VueCheck
 * @description Vue plugin core functions
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import Checkers from './checkers';
import Validator from './validator';

/** Set plugin default options */
const defaultOptions = {
  lang: 'en-US',
  format: 'detailed',
};

/**
 * Mutate plugin default options by merging options provided
 * @param {Object} options
 * @returns {void}
 */
/* istanbul ignore next */
const setDefaultOptions = function (options = {}) {
  /* istanbul ignore else */
  if (!Checkers.isObject(options)) {
    options = {};
    console.warn('object "options" must be an object');
  }

  Object.assign(defaultOptions, options);
};

/**
 * Ensure that option 'format' is recognized by plugin and falbacking if not
 *
 * @param {String} format
 * @returns {String}
 */
const getOutputFormat = function (format) {
  /* istanbul ignore if */
  if (!Checkers.isString(format)) format = defaultOptions.format;

  format = format.trim();

  if (['flat', 'detailed'].indexOf(format) < 0) {
    console.warn(`The format ${format} is unavailable, fallback to 'detailed'.`);
    defaultOptions.format = 'detailed';
    return 'detailed';
  }

  return format;
};

/**
 * Prepare params and call Validator
 *
 * @param {Object} value
 * @param {Object} rules
 * @param {Object} options
 * @returns {String}
 */
const validate = function (value, rules, options) {
  options = Object.assign({}, defaultOptions, options);
  options.format = getOutputFormat(options.format);

  return Validator(value, rules, options);
};

/**
 * Install plugin into vue by setting global options and attaching
 * $check object and $validate to Vue prototype
 *
 * @param {Vue} Vue
 * @param {Object} options
 * @returns {void}
 */
const install = (Vue, options) => {
  setDefaultOptions(options);
  Vue.prototype.$check = Checkers; // eslint-disable-line no-param-reassign
  Vue.prototype.$validate = validate; // eslint-disable-line no-param-reassign
};

/** @export VueCheck */
export default {
  install,
};
