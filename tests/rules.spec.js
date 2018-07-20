// Test checker functions
import rules from '../src/rules';
import Locale from '../src/locale';

const expect = require('chai').expect;

describe('Rules module: /src/rules.js ', () => {
  // Smooke
  describe('Smoke tests', () => {
    it('rules must be an object', () => expect(rules).to.be.an('object'));
    it('rules.empty must be a function', () => expect(rules.empty).to.be.a('function'));
    it('rules.type must be a function', () => expect(rules.type).to.be.a('function'));
    it('rules.email must be a function', () => expect(rules.email).to.be.a('function'));
    it('rules.min must be a function', () => expect(rules.min).to.be.a('function'));
    it('rules.max must be a function', () => expect(rules.max).to.be.a('function'));
  });

  describe('empty rule', () => {
    it('rules.empty(null, null, null, Locale("en-US")) must return a string: "rule \'empty\' must be true or false"', () =>
      expect(rules.empty(null, null, null, Locale('en-US'))).to.equal(
        "rule 'empty' must be true or false",
      ));

    it('rules.empty(null, null, null, Locale("pt-BR")) must return a string: "regra \'empty\' deve ser verdadeiro ou falso"', () =>
      expect(rules.empty(null, null, null, Locale('pt-BR'))).to.equal(
        "regra 'empty' deve ser verdadeiro ou falso",
      ));

    it('rules.empty(null, false, \'field\', Locale("en-US")) must return a string: "field can not be empty"', () =>
      expect(rules.empty(null, false, 'field', Locale('en-US'))).to.equal(
        'field can not be empty',
      ));

    it('rules.empty(0, false, null, null) must return undefined', () =>
      expect(rules.empty(0, false, null, null)).to.equal(undefined));
  });

  describe('type rule', () => {
    it('rules.type(null, null, null, Locale("en-US")) must return a string: "rule \'type\' must be a text or an  array"', () =>
      expect(rules.type(null, null, null, Locale('en-US'))).to.equal(
        "rule 'type' must be a text or an  array",
      ));

    it('rules.type(null, "string", "field", Locale("en-US")) must return a string: "field must be of type \'string\'"', () =>
      expect(rules.type(null, 'string', 'field', Locale('en-US'))).to.equal(
        "field must be of type 'string'",
      ));

    it('rules.type("", "string", "field", Locale("en-US")) must return undefined', () =>
      expect(rules.type('', 'string', 'field', Locale('en-US'))).to.equal(undefined));

    it('rules.type(null, ["string", "integer"], "field", Locale("en-US")) must return a string: "field must be of type \'string, integer\'"', () =>
      expect(rules.type(null, ['string', 'integer'], 'field', Locale('en-US'))).to.equal(
        "field must be of type 'string, integer'",
      ));

    it('rules.type(null, "any", null, null) must return undefined', () =>
      expect(rules.type(null, 'any', null, null)).to.equal(undefined));
  });

  describe('email rule', () => {
    it('rule.email(null, true, "E-mail", Locale("en-US")) must return: "E-mail is invalid"', () => {
      expect(rules.email(null, true, 'E-mail', Locale('en-US'))).to.equal('E-mail is invalid');
    });

    it('rule.email(null, false, "E-mail", Locale("en-US")) must return: undefined', () => {
      expect(rules.email(null, false, 'E-mail', Locale('en-US'))).to.equal(undefined);
    });

    it('rule.email(null, true, "E-mail", Locale("pt-BR")) must return: "E-mail é inválido"', () => {
      expect(rules.email(null, true, 'E-mail', Locale('pt-BR'))).to.equal('E-mail é inválido');
    });

    it('rule.email("a@b.cd", false, null, null) must return: undefined', () => {
      expect(rules.email('a@b.cd', true, null, null)).to.equal(undefined);
    });

    it('rule.email("a@b.cd", "", null, null) must return: "rule \'email\' must be true or false"', () => {
      expect(rules.email('a@b.cd', '', null, Locale('en-US'))).to.equal(
        "rule 'email' must be true or false",
      );
    });
  });

  describe('min rule', () => {
    it('rule.min(1, new Date(), null, Locale("en-US")) must return: "rule \'min\' must be date for date values"', () => {
      expect(rules.min(new Date(), 1, null, Locale('en-US'))).to.equal(
        "rule 'min' must be date for date values",
      );
    });

    it('rule.min(0, 1, "field", Locale("en-US")) must return: "field must be major than 0"', () => {
      expect(rules.min(0, 1, 'field', Locale('en-US'))).to.equal('field must be major than 0');
    });

    it('rule.min([], 1, "field", Locale("en-US")) must return: "field must have at least 1 item(s)"', () => {
      expect(rules.min([], 1, 'field', Locale('en-US'))).to.equal(
        'field must have at least 1 item(s)',
      );
    });

    it('rule.min("", 1, "field", Locale("en-US")) must return: "field must have at least 1 character(s)"', () => {
      expect(rules.min('', 1, 'field', Locale('en-US'))).to.equal(
        'field must have at least 1 character(s)',
      );
    });

    it('rule.min(new Date(), new Date(), "field", Locale("en-US")) must return: "field can not be minor than 2222-01-01T00:00:00.000Z"', () => {
      expect(rules.min(new Date(), new Date('2222-01-01'), 'field', Locale('en-US'))).to.equal(
        'field can not be minor than 2222-01-01T00:00:00.000Z',
      );
    });

    it('rule.min({}, 1, "field", Locale("en-US")) must return: "type invalid for \'min\' rule"', () => {
      expect(rules.min({}, 1, 'field', Locale('en-US'))).to.equal("type invalid for 'min' rule");
    });
  });

  describe('max rule', () => {
    it('rules.max(1, new Date(), null, Locale("en-US")) must return: "rule \'max\' must be date for date values"', () => {
      expect(rules.max(new Date(), 1, null, Locale('en-US'))).to.equal(
        "rule 'max' must be date for date values",
      );
    });

    it('rules.max(1, 0, "field", Locale("en-US")) must return: "field must be major than -1"', () => {
      expect(rules.max(1, 0, 'field', Locale('en-US'))).to.equal('field must be major than -1');
    });

    it('rules.max([1], 0, "field", Locale("en-US")) must return: "field must have at most 0 item(s)"', () => {
      expect(rules.max([1], 0, 'field', Locale('en-US'))).to.equal(
        'field must have at most 0 item(s)',
      );
    });

    it('rules.max("1", 0, "field", Locale("en-US")) must return: "field must have at most 0 character(s)"', () => {
      expect(rules.max('1', 0, 'field', Locale('en-US'))).to.equal(
        'field must have at most 0 character(s)',
      );
    });

    it('rules.max(new Date(\'2018 - 07 - 16\'), new Date(\'2018 - 07 - 15\'), "field", Locale("en-US")) must return: "field can not be major than 2018-07-15T00:00:00.000Z"', () => {
      expect(
        rules.max(new Date('2018-07-16'), new Date('2018-07-15'), 'field', Locale('en-US')),
      ).to.equal('field can not be major than 2018-07-15T00:00:00.000Z');
    });

    it('rules.max({}, 1, "field", Locale("en-US")) must return: "type invalid for \'max\' rule"', () => {
      expect(rules.max({}, 1, 'field', Locale('en-US'))).to.equal("type invalid for 'max' rule");
    });

    it('rules.max(1, 2, null, null) must return: undefined', () => {
      expect(rules.max(1, 2, null, null)).to.equal(undefined);
    });
  });

  describe('pattern rule', () => {
    it('rules.pattern must be a function', () => expect(rules.pattern).to.be.a('function'));

    it('rules.pattern(null, null, null, Locale("en-US")) must return: "value for rule \'pattern\' must be a text"', () => {
      expect(rules.pattern(null, null, null, Locale('en-US'))).to.equal(
        "value for rule 'pattern' must be a text",
      );
    });

    it('rules.pattern("abc", null, null, Locale("en-US")) must return: "rule \'pattern\' must be a text an array or a regular expression"', () => {
      expect(rules.pattern('abc', null, null, Locale('en-US'))).to.equal(
        "rule 'pattern' must be a text an array or a regular expression",
      );
    });

    it('rules.pattern("abc", "[\\d]", "field", Locale("en-US")) must return: "field is invalid"', () => {
      expect(rules.pattern('abc', '[\\d]', 'field', Locale('en-US'))).to.equal('field is invalid');
    });

    it('rules.pattern("abc1", "[\\d]", "field", Locale("en-US")) must return: undefined', () => {
      expect(rules.pattern('abc1', '[\\d]', 'field', Locale('en-US'))).to.equal(undefined);
    });

    it('rules.pattern("abc1", new RegExp("[\\d]"), "field", Locale("en-US")) must return: undefined', () => {
      expect(rules.pattern('abc1', new RegExp('[\\d]'), 'field', Locale('en-US'))).to.equal(
        undefined,
      );
    });

    it('rules.pattern("abc1", ["[\\d]", "gi"], "field", Locale("en-US")) must return: undefined', () => {
      expect(rules.pattern('abc1', ['[\\d]', 'gi'], 'field', Locale('en-US'))).to.equal(undefined);
    });
  });

  describe('callback rule', () => {
    it('rules.callback must be a function', () => expect(rules.callback).to.be.a('function'));

    it('rules.callback(null, null, null, Locale("en-US")) must return: "rule \'callback\' must be a function"', () =>
      expect(rules.callback(null, null, null, Locale('en-US'))).to.equal(
        "rule 'callback' must be a function",
      ));

    it('rules.callback(null, () => "foo bar baz") must return: "foo bar baz"', () =>
      expect(rules.callback(null, () => 'foo bar baz')).to.equal('foo bar baz'));

    it('rules.callback(null, () => undefined) must return: undefined', () =>
      expect(rules.callback(null, () => undefined)).to.equal(undefined));
  });
});
