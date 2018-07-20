// Test Locale module
import Locale from '../src/locale';

const expect = require('chai').expect;

describe('Locale module', () => {
  it('Locale module must be a function', () => expect(Locale).to.be.a('function'));
  it("Locale('en-US') must return an object", () => expect(Locale('en-US')).to.be.a('object'));
});
