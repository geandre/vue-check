/**
 * @module Rules
 * @description Groups validation rules
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import Checkers from './checkers';
import Helpers from './helpers';

/**
 * Empty rule checker
 *
 * @func empty
 * @param {*} value
 * @param {Boolean} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const empty = function (value, rule, alias, dic) {
  // Validate the rule value
  if (!Checkers.isBoolean(rule)) return `${dic._rule} 'empty' ${dic._must_be} ${dic._boolean}`;
  // Validate value
  if (Checkers.isEmpty(value) && !rule) return `${alias} ${dic._cannot_be} ${dic._empty}`;
  // No problem no return
  return undefined;
};

/**
 * Type rule checker
 *
 * @func type
 * @param {*} value
 * @param {(String|Array)} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const type = function (value, rules, alias, dic) {
  if (Checkers.isString(rules)) rules = [`${rules}`];

  if (!Checkers.isArray(rules)) {
    return `${dic._rule} 'type' ${dic._must_be} ${dic._a} ${dic._string} ${dic._or} ${dic._an}  ${
      dic._array
    }`;
  }

  // 'any' flag always is valid
  if (rules.length === 1 && rules[0] == 'any') return undefined;

  const availableTypes = [
    'array',
    'boolean',
    'date',
    'float',
    'function',
    'integer',
    'object',
    'promise',
    'regexp',
    'string',
  ];

  // Only available types will be evaluated
  rules = rules.filter(rule => availableTypes.indexOf(rule) >= 0);

  const valueType = Helpers.getType(value);

  if (rules.indexOf(valueType) >= 0) return undefined;

  return `${alias} ${dic._must_be} ${dic._of} ${dic._type} '${String.prototype.replace.call(
    rules.join(', '),
    /, $/,
    '',
  )}'`;
};

/**
 * Email rule checker
 *
 * @func email
 * @param {*} value
 * @param {Boolean} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const email = function (value, rule, alias, dic) {
  // Validate the rule value
  if (!Checkers.isBoolean(rule)) return `${dic._rule} 'email' ${dic._must_be} ${dic._boolean}`;
  // Validate value
  if (!Checkers.isEmail(value) && rule) return `${alias} ${dic._is} ${dic._invalid}`;
  // No problem no return
  return undefined;
};

/**
 * Min rule checker
 *
 * @func min
 * @param {*} value
 * @param {(Number|Date)} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const min = function (value, rule, alias, dic) {
  const valueType = Helpers.getType(value);
  let size = null;

  // Get the size of value
  if (valueType == 'array' || valueType == 'string') size = value.length;
  if (valueType == 'integer' || valueType == 'float') size = value;
  if (valueType == 'date') {
    size = value.getTime();
    if (!Checkers.isDate(rule)) {
      return `${dic._rule} 'min' ${dic._must_be} ${dic._date} ${dic._for} ${dic._date} ${
        dic._value
      }s`;
    }
    rule = rule.getTime();
  }

  // If no type was taken
  if (size === null) return `${dic._type} ${dic._invalid} ${dic._for} 'min' ${dic._rule}`;

  // Finaly the rule
  if (size < rule) {
    let msg = `${alias} ${dic._must_be} ${dic._major_than} ${rule - 1}`;

    if (valueType == 'array') {
      msg = `${alias} ${dic._must_have} ${dic._at_least} ${rule} ${dic._item}`;
    }
    if (valueType == 'string') {
      msg = `${alias} ${dic._must_have} ${dic._at_least} ${rule} ${dic._char}`;
    }
    if (valueType == 'date') {
      msg = `${alias} ${dic._cannot_be} ${dic._minor_than} ${new Date(rule).toJSON()}`;
    }
    return msg;
  }
  return undefined;
};

/**
 * Max rule checker
 *
 * @func max
 * @param {*} value
 * @param {(Number|Date)} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const max = function (value, rule, alias, dic) {
  const valueType = Helpers.getType(value);
  let size = null;

  // Get the size of value
  if (valueType == 'array' || valueType == 'string') size = value.length;
  if (valueType == 'integer' || valueType == 'float') size = value;
  if (valueType == 'date') {
    size = value.getTime();
    if (!Checkers.isDate(rule)) {
      return `${dic._rule} 'max' ${dic._must_be} ${dic._date} ${dic._for} ${dic._date} ${
        dic._value
      }s`;
    }
    rule = rule.getTime();
  }

  // If no type was taken
  if (size === null) return `${dic._type} ${dic._invalid} ${dic._for} 'max' ${dic._rule}`;

  // Finaly the rule
  if (size > rule) {
    let msg = `${alias} ${dic._must_be} ${dic._major_than} ${rule - 1}`;

    if (valueType == 'array') {
      msg = `${alias} ${dic._must_have} ${dic._at_most} ${rule} ${dic._item}`;
    }
    if (valueType == 'string') {
      msg = `${alias} ${dic._must_have} ${dic._at_most} ${rule} ${dic._char}`;
    }
    if (valueType == 'date') {
      msg = `${alias} ${dic._cannot_be} ${dic._major_than} ${new Date(rule).toJSON()}`;
    }
    return msg;
  }
  return undefined;
};

/**
 * Pattern rule checker
 *
 * @func pattern
 * @param {*} value
 * @param {(String|RegExp|Array)} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const pattern = function (value, rule, alias, dic) {
  // value must be string
  if (!Checkers.isString(value)) {
    return `${dic._value} ${dic._for} ${dic._rule} 'pattern' ${dic._must_be} ${dic._a} ${
      dic._string
    }`;
  }

  // rule must be string, regex or array
  if (!Checkers.isString(rule) && !Checkers.isRegExp(rule) && !Checkers.isArray(rule)) {
    return `${dic._rule} 'pattern' ${dic._must_be} ${dic._a} ${dic._string} ${dic._an} ${
      dic._array
    } ${dic._or} ${dic._a} ${dic._regexp}`;
  }

  // If rule isn't a regexp convert it
  if (Checkers.isString(rule)) rule = new RegExp(rule);
  if (Checkers.isArray(rule)) rule = new RegExp(...rule);

  // Finaly the rule
  if (!rule.test(value)) return `${alias} ${dic._is} ${dic._invalid}`;

  return undefined;
};

/**
 * Callback rule checker
 *
 * @func callback
 * @param {*} value
 * @param {Function} rule
 * @param {String} alias
 * @param {Object} dic
 * @returns {(String|undefined)}
 */
const callback = function (value, rule, alias, dic) {
  // Rule callback must be a function
  if (!Checkers.isFunction(rule)) {
    return `${dic._rule} 'callback' ${dic._must_be} ${dic._a} ${dic._function}`;
  }
  // Evaluate
  const msg = rule(value, alias, dic);
  if (Checkers.isString(msg)) return msg;
  // At the end
  return undefined;
};

/** @export Rules */
export default {
  callback,
  email,
  empty,
  max,
  min,
  pattern,
  type,
};
