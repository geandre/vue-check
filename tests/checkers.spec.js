// Test checker functions
import $ from '../src/checkers';

const expect = require('chai').expect;

// Samples
const anEmptyObject = {};
const anEmptyArray = [];
const anEmptyString = '';
const aString = 'abcd';
const aNull = null;
const anUndefined = undefined;
const aBoolean = true;
const anotherBoolean = false;
const aDate = new Date();
const anInteger = Math.floor(Math.random() * 1000);
const aFloat = Math.fround(Math.random() * 1000);
const anArrowFunction = () => undefined;
const aRegExp = new RegExp('[a-z]');
const aPromise = new Promise((res, rej) => res(true));
const aPlainObject = { a: 'b' };
const aNonPlainObject = aPromise;
const anArray = ['a', 'b', 'c'];
const anEmail = 'teste.email@server.org.xx';
const aFunction = function () {
  return undefined;
};

describe('Test checkers module: /src/checkers.js ', () => {
  // Check module structure
  describe('Smoke tests', () => {
    it('checkers modules must exist', () => expect($).to.be.a('object'));
    it('isArray must be a function', () => expect($.isArray).to.be.a('function'));
    it('isBoolean must be a function', () => expect($.isBoolean).to.be.a('function'));
    it('isDate must be a function', () => expect($.isDate).to.be.a('function'));
    it('isDefined must be a function', () => expect($.isDefined).to.be.a('function'));
    it('isEmail must be a function', () => expect($.isEmail).to.be.a('function'));
    it('isEmpty must be a function', () => expect($.isEmpty).to.be.a('function'));
    it('isFloat must be a function', () => expect($.isFloat).to.be.a('function'));
    it('isFunction must be a function', () => expect($.isFunction).to.be.a('function'));
    it('isInteger must be a function', () => expect($.isInteger).to.be.a('function'));
    it('isNull must be a function', () => expect($.isNull).to.be.a('function'));
    it('isNumber must be a function', () => expect($.isNumber).to.be.a('function'));
    it('isObject must be a function', () => expect($.isObject).to.be.a('function'));
    it('isPlainObject must be a function', () => expect($.isPlainObject).to.be.a('function'));
    it('isPromise must be a function', () => expect($.isPromise).to.be.a('function'));
    it('isRegExp must be a function', () => expect($.isRegExp).to.be.a('function'));
    it('isString must be a function', () => expect($.isString).to.be.a('function'));
  });

  // Check type checker functions
  describe("Check the 'type checker' functions", () => {
    // Test isArray
    describe('isArray', () => {
      it(`Must return true for '${JSON.stringify(anEmptyArray)}'`, () =>
        expect($.isArray(anEmptyArray)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anArray)}'`, () =>
        expect($.isArray(anArray)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isArray(anUndefined)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anEmptyObject)}'`, () =>
        expect($.isArray(anEmptyObject)).to.equal(false));
    });

    // Test isBoolean
    describe('isBoolean', () => {
      it(`Must return true for '${JSON.stringify(aBoolean)}'`, () =>
        expect($.isBoolean(aBoolean)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anotherBoolean)}'`, () =>
        expect($.isBoolean(anotherBoolean)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isBoolean(anUndefined)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isBoolean(anInteger)).to.equal(false));

      it(`Must return false for '${JSON.stringify(0)}'`, () =>
        expect($.isBoolean(0)).to.equal(false));
    });

    // Test isDate
    describe('isDate', () => {
      it(`Must return true for '${JSON.stringify(aDate)}'`, () =>
        expect($.isDate(aDate)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isDate(anUndefined)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isDate(anInteger)).to.equal(false));

      it(`Must return false for '${JSON.stringify(aString)}'`, () =>
        expect($.isDate(aString)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anEmptyObject)}'`, () =>
        expect($.isDate(anEmptyObject)).to.equal(false));
    });

    // Test isDefined
    describe('isDefined', () => {
      it(`Must return true for '${JSON.stringify(aNull)}'`, () =>
        expect($.isDefined(aNull)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isDefined(anInteger)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isDate(anUndefined)).to.equal(false));
    });

    // Test isNumber
    describe('isNumber', () => {
      it(`Must return true for '${JSON.stringify(aFloat)}'`, () =>
        expect($.isNumber(aFloat)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isNumber(anInteger)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isNumber(anUndefined)).to.equal(false));
    });

    // Test isInteger
    describe('isInteger', () => {
      it(`Must return true for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isInteger(anInteger)).to.equal(true));

      it(`Must return false for '${JSON.stringify(aFloat)}'`, () =>
        expect($.isInteger(aFloat)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isInteger(anUndefined)).to.equal(false));
    });

    // Test isFloat
    describe('isFloat', () => {
      it(`Must return true for '${JSON.stringify(aFloat)}'`, () =>
        expect($.isFloat(aFloat)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isFloat(anInteger)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isFloat(anUndefined)).to.equal(false));
    });

    // Test isNull
    describe('isNull', () => {
      it(`Must return true for '${JSON.stringify(aNull)}'`, () =>
        expect($.isNull(aNull)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isNull(anInteger)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isNull(anUndefined)).to.equal(false));
    });

    // Test isString
    describe('isString', () => {
      it(`Must return true for '${JSON.stringify(aString)}'`, () =>
        expect($.isString(aString)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anEmptyString)}'`, () =>
        expect($.isString(anEmptyString)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anInteger)}'`, () =>
        expect($.isString(anInteger)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isString(anUndefined)).to.equal(false));
    });

    // Test isFunction
    describe('isFunction', () => {
      it("Must return true for 'function(){}'", () =>
        expect($.isFunction(aFunction)).to.equal(true));

      it("Must return true for '() => {}'", () =>
        expect($.isFunction(anArrowFunction)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isFunction(anUndefined)).to.equal(false));
    });

    // Test isPromise
    describe('isPromise', () => {
      it("Must return true for 'new Promise(() => {})'", () =>
        expect($.isPromise(aPromise)).to.equal(true));

      it("Must return false for '() => {}'", () =>
        expect($.isPromise(anArrowFunction)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isPromise(anUndefined)).to.equal(false));
    });

    // Test isObject
    describe('isObject', () => {
      it(`Must return true for '${JSON.stringify(anEmptyObject)}'`, () =>
        expect($.isObject(anEmptyObject)).to.equal(true));

      it(`Must return true for '${JSON.stringify(aNonPlainObject)}'`, () =>
        expect($.isObject(aNonPlainObject)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isObject(anUndefined)).to.equal(false));
    });

    // Test isRegExp
    describe('isRegExp', () => {
      it('Must return true for /[a-z]/i', () => expect($.isRegExp(aRegExp)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isRegExp(anUndefined)).to.equal(false));
    });
  });

  // Check structure checkers
  describe("Check 'structure checker' functions", () => {
    // Test isEmpty
    describe('isEmpty', () => {
      it(`Must return true for '${JSON.stringify(aNull)}'`, () =>
        expect($.isEmpty(aNull)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isEmpty(anUndefined)).to.equal(true));

      it(`Must return true for '${JSON.stringify(anEmptyArray)}'`, () =>
        expect($.isEmpty(anEmptyArray)).to.equal(true));

      it(`Must return false for '${JSON.stringify(anArray)}'`, () =>
        expect($.isEmpty(anArray)).to.equal(false));

      it(`Must return true for '${JSON.stringify(anEmptyObject)}'`, () =>
        expect($.isEmpty(anEmptyObject)).to.equal(true));

      it('Must return false for "new Pomise(() => {})"', () =>
        expect($.isEmpty(aNonPlainObject)).to.equal(false));

      it(`Must return true for '${JSON.stringify(anEmptyString)}'`, () =>
        expect($.isEmpty(anEmptyString)).to.equal(true));

      it(`Must return false for '${JSON.stringify(aString)}'`, () =>
        expect($.isEmpty(aString)).to.equal(false));

      it('Must return true for new Object(null)', () =>
        expect($.isEmpty(new Object(null))).to.equal(true));

      it(`Must return false for '${JSON.stringify(aPlainObject)}'`, () =>
        expect($.isEmpty(aPlainObject)).to.equal(false));

      it(`Must return true for '${JSON.stringify('')}'`, () =>
        expect($.isEmpty(new Map())).to.equal(true));

      it('Must return false for 0', () => expect($.isEmpty(0)).to.equal(false));
    });

    // isEmail
    describe('isEmail', () => {
      it(`Must return true for '${JSON.stringify(anEmail)}'`, () =>
        expect($.isEmail(anEmail)).to.equal(true));

      it(`Must return false for '${JSON.stringify(aString)}'`, () =>
        expect($.isEmail(aString)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isEmail(anUndefined)).to.equal(false));
    });

    // isPlainObject
    describe('isPlainObject', () => {
      it(`Must return true for '${JSON.stringify(aPlainObject)}'`, () =>
        expect($.isPlainObject(aPlainObject)).to.equal(true));

      it("Must return false for 'new Promise'", () =>
        expect($.isPlainObject(aNonPlainObject)).to.equal(false));

      it(`Must return false for '${JSON.stringify(anUndefined)}'`, () =>
        expect($.isPlainObject(anUndefined)).to.equal(false));
    });
  });
});
