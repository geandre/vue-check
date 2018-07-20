// Test checker functions
import VueCheck from '../src/vue-check';

const Vue = require('../node_modules/vue/dist/vue.common');
const expect = require('chai').expect;

// Build context
const globalOptions = {
  lang: 'en-US',
  format: 'detailed',
};

Vue.use(VueCheck, globalOptions);
const App = new Vue();

// Samples
const value = {
  name: 'Geandre Miranda',
  email: 'geandremiranda.ms@gmail.com',
  phones: ['66 9 9639-4294', '66 9 9905-2023'],
  address: {
    zipCode: '78890000',
    countie: 'Sorriso-MT',
  },
};
const rule = {
  name: {
    alias: 'Nome',
    type: 'string',
    empty: false,
  },
  email: {
    alias: 'E-mail',
    type: 'string',
    empty: false,
    min: 5,
  },
  phones: {
    alias: 'Telefone',
    type: 'array',
    empty: false,
    _: {
      type: 'string',
      empty: false,
    },
  },
  'address.zipCode': {
    empty: false,
    length: 8,
    pattern: '[\\d]{8}',
  },
};
const options = {
  lang: 'pt-BR',
  format: 'detailed',
};

const alternativeOptions = {
  lang: 'en-US',
  format: 'flat',
};

const alternativeRule = {
  name: {
    empty: null,
  },
  email: {
    empty: false,
  },
  'address.district': null,
};

const alternativeValue = {
  name: '',
  email: null,
};

const complexValue = {
  person: {
    name: 'Geandre',
    address: {
      countie: {
        country: 'Brasil',
        uf: 'Mato Grosso',
        name: 'Sorriso',
        toString() {
          return `${this.country}, ${this.uf}, ${this.name}`;
        },
      },
      zipCode: '78890000',
    },
    phones: ['996394294', '66999052023', '35441114'],
    mailServers: [
      {
        server: 'smtp.gmail.com',
        port: [542],
        user: 'user@gmail.com',
        password: 'xyz_789_EE',
      },
      {
        server: 'smtp.outlook.com',
        port: 571,
        user: 'user@outlook.com',
        password: 'xyz_789_EE',
      },
    ],
  },
};

const complexRule = {
  person: {
    alias: 'Pessoa',
    type: 'object',
    empty: false,
    recursive: {
      name: {
        alias: 'Nome',
        type: 'string',
        empty: false,
        min: 4,
      },
      address: {
        alias: 'Endereço',
        type: 'object',
        empty: false,
        recursive: {
          zipCode: {
            alias: 'CEP',
            type: 'string',
            min: 20,
          },
          countie: {
            alias: 'Cidade',
            empty: false,
            recursive: {
              country: {
                alias: 'País',
                type: 'string',
                empty: false,
                max: 2,
                min: 30,
              },
              uf: {
                alias: 'UF',
                type: 'string',
                empty: false,
              },
              name: {
                alias: 'Nome',
                type: 'integer',
                empty: false,
              },
            },
          },
        },
      },
      phones: {
        alias: 'Telefones',
        min: 1,
        _: {
          min: 8,
          max: 20,
        },
      },
      mailServers: {
        alias: 'Servidor de E-mail',
        empty: false,
        _: {
          recursive: {
            server: {
              alias: 'Servidor',
              type: 'string',
            },
            port: {
              alias: 'Porta',
              type: 'integer',
              empty: false,
            },
          },
        },
        _1: {
          recursive: {
            server: {
              alias: 'Servidor',
              type: 'string',
            },
            port: {
              alias: 'Porta',
              type: 'integer',
              empty: false,
            },
            user: {
              type: 'string',
              email: true,
            },
          },
        },
      },
    },
  },
};

describe('Endpoint module', () => {
  // Smooke
  describe('Smoke tests', () => {
    it('App must be an object', () => expect(App).to.be.a('object'));
    it('App.$check must be an object', () => expect(App.$check).to.be.a('object'));
    it('App.$validate must be a function', () => expect(App.$validate).to.be.a('function'));
  });

  // Endpoint tests
  describe('Test Vue.$validate function', () => {
    it('App.$validate(<void>) must return an array with two itens', () =>
      expect(App.$validate())
        .to.be.an('array')
        .to.have.lengthOf(2));

    it('App.$validate({value}) must return an array with one item', () =>
      expect(App.$validate(value))
        .to.be.an('array')
        .to.have.lengthOf(1));

    it('App.$validate(undefined, {rule}) must return an array with one item', () =>
      expect(App.$validate(undefined, rule))
        .to.be.an('array')
        .to.have.lengthOf(1));

    it('App.$validate({value}, {rule}) must return undefined', () =>
      expect(App.$validate(value, rule)).to.be.an('undefined'));

    it('App.$validate({value}, {rule}, {options}) must return undefined', () =>
      expect(App.$validate(value, rule, options)).to.be.an('undefined'));

    it('App.$validate({value}, {rule}, { lang: "xx-XX", format: "keyed }) must return undefined', () =>
      expect(App.$validate(value, rule, { lang: 'xx-XX', format: 'keyed' })).to.be.an('undefined'));

    it('App.$validate({value}, {rule}, {} ) must return undefined', () =>
      expect(App.$validate(value, rule, {})).to.be.an('undefined'));

    it('App.$validate({}, {}, {lang: "en-US", format: "flat"} ) must return an array with two itens', () =>
      expect(App.$validate({}, {}, alternativeOptions))
        .to.be.an('array')
        .to.have.lengthOf(2));

    it('App.$validate({value}, {name: null, email: null}) must return undefined', () =>
      expect(App.$validate(value, alternativeRule)).to.be.an('array'));

    it('App.$validate(alternativeValue, alternativeRule, alternativeOptions ) must return an array with two itens', () =>
      expect(App.$validate(alternativeValue, alternativeRule, alternativeOptions))
        .to.be.an('array')
        .to.have.lengthOf(2));

    it('App.$validate(complexValue, complexRule) log', () =>
      expect(App.$validate(complexValue, complexRule, { lang: 'pt-BR' }))
        .to.be.an('array')
        .to.have.lengthOf(5));
  });
});
