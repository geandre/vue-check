// Test checker functions
import validator from '../src/validator';

const expect = require('chai').expect;

describe('Validator module: /src/validator.js ', () => {
  // Smooke
  describe('Smoke tests', () => {
    it('validator must be a function', () => expect(validator).to.be.a('function'));
  });
});
