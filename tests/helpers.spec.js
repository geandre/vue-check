// Test helpers
import helpers from '../src/helpers';

const expect = require('chai').expect;

describe('helpers module: /src/helpers.js ', () => {
  // Smooke
  describe('Smoke tests', () => {
    it('helpers must be an object', () => expect(helpers).to.be.an('object'));
    it('helpers.getType must be a function', () => expect(helpers.getType).to.be.a('function'));
  });

  // getType Function
  describe('helper.getType ', () => {
    it("helpers.getType() must return 'undefined'", () =>
      expect(helpers.getType()).to.equal('undefined'));

    it("helpers.getType(null) must return 'null'", () =>
      expect(helpers.getType(null)).to.equal('null'));

    it("helpers.getType([]) must return 'array'", () =>
      expect(helpers.getType([])).to.equal('array'));

    it("helpers.getType(true) must return 'boolean'", () =>
      expect(helpers.getType(true)).to.equal('boolean'));

    it("helpers.getType(new Date()) must return 'date'", () =>
      expect(helpers.getType(new Date())).to.equal('date'));

    it("helpers.getType(1.5) must return 'float'", () =>
      expect(helpers.getType(1.5)).to.equal('float'));

    it("helpers.getType(() => {}) must return 'function'", () =>
      expect(helpers.getType(() => {})).to.equal('function'));

    it("helpers.getType(1) must return 'integer'", () =>
      expect(helpers.getType(1)).to.equal('integer'));

    it("helpers.getType(new Promise(() => {})) must return 'promise'", () =>
      expect(helpers.getType(new Promise(() => {}))).to.equal('promise'));

    it("helpers.getType(/./) must return 'regexp'", () =>
      expect(helpers.getType(/./)).to.equal('regexp'));

    it("helpers.getType('abc') must return 'string'", () =>
      expect(helpers.getType('abc')).to.equal('string'));

    it("helpers.getType({}) must return 'object'", () =>
      expect(helpers.getType({})).to.equal('object'));
  });
});
