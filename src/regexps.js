/**
 * @module Regexps
 * @description Grups RegExps
 * @author Geandre Miranda <geandremiranda.ms@gmail.com>
 */

/** @constant email */
const email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

/** @constant nonDigits */
const nonDigits = /[^\d]/gi;

/** @export Regexps */
export default {
  email,
  nonDigits,
};
