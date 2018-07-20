/**
 * @module Locale
 * @description Groups dictionary objects
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

import enus from './locales/enUS';
import ptbr from './locales/ptBR';

// Register locales
const locales = { enus, ptbr };

/**
 * Return a language set
 *
 * @param {String} key A language tag
 * @see https://gist.github.com/geandre/32742bf16ab3dd0ba527212eb5b3b98f
 * @returns {Object}
 */
const getLanguageSet = (key) => {
  let langKey = key
    .trim()
    .replace(/[^a-z]/gi, '')
    .toLowerCase();

  // Check if locale object is registered
  if (!Object.prototype.hasOwnProperty.call(locales, langKey)) {
    console.warn(`lang '${key}' unavailable, fallback to 'en-US'`);
    langKey = 'enus';
  }

  return Object.freeze(locales[langKey]);
};

/** @export Locale */
export default getLanguageSet;
