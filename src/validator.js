/**
 * @module Validator
 * @description Validator core functions
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import Checkers from './checkers';
import Locale from './locale';
import Rules from './rules';

/**
 * Check if value is a valid object to validate
 *
 * @param {*} value
 * @param {Object} dic A Locale object
 * @param {String} format
 */
const checkValue = function (value, dic, format) {
  const messages = [];
  let msg = null;

  if (Checkers.isEmpty(value)) {
    msg = `'value' ${dic._cannot_be} ${dic._empty}`;
    messages.push(msg);
  }

  if (!Checkers.isPlainObject(value)) {
    msg = `'value' ${dic._must_be} ${dic._a} ${dic._plainobject}`;
    messages.push(msg);
  }

  if (Checkers.isEmpty(messages)) return undefined;

  // console.error('Validation error for object value: ', value);

  if (format == 'flat') {
    return messages;
  }

  return {
    validator: 'checkValue',
    value,
    errors: messages,
  };
};

/**
 * Check if value is a valid rules object
 *
 * @param {*} value
 * @param {Object} dic A Locale object
 * @param {String} format
 */
const checkRules = function (value, dic, format) {
  const messages = [];
  let msg = null;

  if (Checkers.isEmpty(value)) {
    msg = `'rules' ${dic._cannot_be} ${dic._empty}`;
    messages.push(msg);
  }

  if (Checkers.isEmpty(messages)) return undefined;

  // console.error('Validation error for object rules: ', value);

  if (format == 'flat') {
    return messages;
  }

  return {
    validator: 'checkRules',
    value,
    errors: messages,
  };
};

/**
 * Get property value
 *
 * @param {*} value
 * @param {String} path
 */
const deepFind = function (value, path) {
  const paths = path.split('.');
  let current = value;
  let i;

  // eslint-disable-next-line no-plusplus
  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    }
    current = current[paths[i]];
  }
  return current;
};

/**
 * Apply the rules
 *
 * @param {*} value
 * @param {*} rule
 * @param {String} key
 * @param {Object} dic
 * @param {String} format
 * @returns {(Object|Array)}
 */
const applyRule = function (value, fieldRules, key, options) {
  // If has no fieldRules, all is ok
  if (Checkers.isEmpty(fieldRules)) return undefined;

  // Our field need a name
  const alias = Checkers.isString(fieldRules.alias)
    ? fieldRules.alias
    : `${key.charAt(0).toUpperCase()}${key.substr(1)}`.trim().replace('.', ' ');

  // Error stack
  const messages = [];

  // Simple validation based on Rules module
  const validateByRuleModule = (ruleKey) => {
    const msg = Rules[ruleKey](value, fieldRules[ruleKey], alias, Locale(options.lang));
    if (!Checkers.isEmpty(msg) && Checkers.isString(msg)) messages.push(msg);
  };

  // Call recursive validation
  const validateRecursively = (recursiveRuleKey) => {
    // eslint-disable-next-line no-use-before-define
    const msg = validator(value, fieldRules[recursiveRuleKey], options);
    if (Checkers.isArray(msg)) messages.push(...msg);
  };

  // Iterates over provided rules and call specific handler to it
  Object.keys(fieldRules).forEach((ruleKey) => {
    // For rule keys that match some rule module key
    if (Object.prototype.hasOwnProperty.call(Rules, ruleKey)) validateByRuleModule(ruleKey);
    // For recursive validations (nested objects)
    else if (ruleKey === 'recursive') validateRecursively(ruleKey);
  });

  // Validade array items
  if (Checkers.isArray(value)) {
    // Generic rule
    const ruleForAll = Checkers.isObject(fieldRules._) ? Object.assign({}, fieldRules._) : {};
    // Specific rules
    const itensRules = value.map(
      (_item, index) =>
        (Checkers.isObject(fieldRules[`_${index}`])
          ? Object.assign({}, ruleForAll, fieldRules[`_${index}`])
          : ruleForAll),
    );

    itensRules.forEach((itemRule, index) => {
      let msgs = applyRule(value[index], itemRule, key, options);
      if (Checkers.isArray(msgs)) {
        msgs = msgs.map(msg => `${alias} ${index + 1} ${msg}`);
        messages.push(...msgs);
      }
    });
  }

  return Checkers.isEmpty(messages) ? undefined : messages;
};

/**
 * Validation main function
 *
 * @param {Object} value Any data object to be checked
 * @param {Object} rules A object with rules to test
 * @param {Object} options An optional object of settings
 */
const validator = function (value, rules, options) {
  // Get the dictionary
  const dic = Locale(options.lang);

  // Attach extended rules
  /* istanbul ignore next */
  if (Checkers.isObject(options.extendRules)) Object.assign(Rules, options.extendRules);

  // Initialize error stack
  let errors = [];

  // Verify values
  const valueErrors = checkValue(value, dic, options.format);
  if (!Checkers.isEmpty(valueErrors)) errors = errors.concat(valueErrors);

  // Verify rules
  const ruleErrors = checkRules(rules, dic, options.format);
  if (!Checkers.isEmpty(ruleErrors)) errors = errors.concat(ruleErrors);

  // Check if it's all clean
  if (!Checkers.isEmpty(errors)) return errors;

  // Then proceed validation
  Object.keys(rules).forEach((key) => {
    const currentValue = deepFind(value, key);
    const currentRule = rules[key];
    const currentErrors = applyRule(currentValue, currentRule, key, options);
    if (!Checkers.isEmpty(currentErrors)) errors = errors.concat(currentErrors);
  });

  return Checkers.isEmpty(errors) ? undefined : errors;
};

/** @export Validator */
export default validator;
