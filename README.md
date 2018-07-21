# VueCheck

A Vue plugin to check data objects

Version `1.0.2`

## Installing

Into a Vue 2 project

```
npm install --save vue-check
```

```
import VueCheck from 'vue-check';

Vue.use(VueCheck, { lang: 'en-US', format: 'flat' });
```

## Getting Started

VueCheck exposes an instance property called $check with some checker methods:

```
vm.$check.isString("")      // true
vm.$check.isBoolean(false)  // true
vm.$check.isEmpty(null)     // true
```

Check the docs at section [Checkers](https://geandre.github.io/vue-check/module-Checkers.html)
for all methods.

Also a property called $validate is provided with a function that can check an object based in a
rule object, and returning a list of inconsistency:

```
vm.$validate(value, rules); // Array | undefined
```

### Building rule objects

Rules objects are based on value objects.

For example, let's assume that we need to validate a person object like this one:

```js
const aPerson = {
  id: 123,
  name: "Jon Doe",
  gender: "M",
  birth: new Date("2000-01-01"),
  email: "jon_doe@email.com",
  address: {
    zipCode: "78890000",
    cityName: "Smile Town",
    street: "District, Stret, 123"
  },
  phones: ["+55 66 9 9999-9999", "+55 66 9 8888-8888", "+55 66 7777-7777"]
};
```

We can write a rule like that:

```js
const personRule = {
  // The keys in rule object must math the path in value object
  id: {
    // When setted the alias will be used instead of rule key in output messages, this must be a
    // string.
    alias: "Code",
    // Empty rule accept a boolean and check if the value can be an empty value, the emptiness of the
    // value are evaluated by Checkers.isEmpty()
    empty: false,
    // The type rule receive a string or an array of string that must match one of the types
    // returned by Helper.getType().
    type: "integer",
    // Min rule accept a number or a Date object and can be aplied to Numbers, Strings, Arrays and
    // Date objects, Strings and Arrays are evaluated by their length, Dates are compared using
    // .getTime() value.
    min: 1
  },
  name: {
    alias: "Full name",
    empty: false,
    type: "string",
    min: 3,
    // Max rule follow the same patterns of min rule
    max: 100
  },
  // Not putting an alias tells to plugin to use rule key as field name 'gender' in this case
  gender: {
    type: "string",
    empty: false,
    // Pattern rule can be a RegExp object a String or an Array, if a String or Array the value will
    // be used as argument to generate a new RegExp object
    pattern: ["^(M|F)$", "i"]
  },
  birth: {
    type: "date",
    empty: false,
    // because of youngness of our functions, the plugin only can calculate dates after 1970-01-01,
    // feel free to teach it how to count better the time, or wait for future releases
    min: new Date("1970-01-01"),
    max: new Date("2011-01-01")
  },
  email: {
    type: "string",
    empty: true,
    // Email rule accepts a boolean and uses a regexp to evaluate it.
    email: true
  },
  // There is two ways to evaluate nested objects.
  // We can put the path to deep properties using dot notation like 'address.zipCode' as the rule
  // key or point to nested object and use recursive rule with a fully qualified rule object.
  "address.zipCode": {
    alias: "Zip code",
    empty: false,
    type: "string",
    pattern: /^[0-9]{8}$/ // This is for brazilian zip codes without mask
  },
  "address.cityName": {
    alias: "Town",
    empty: false,
    type: "string"
  },
  "address.street": {
    alias: "Street",
    // We can pass a callback function as a rule, it will receive the value as first argument,
    // Alias and a dictionary as second and third...
    // This function must return a string in case of error, any other value will be ignored
    callback: (value, alias, dic) => {
      // Custom evaluation code
    }
  },
  // Then... Let's work with arrays. Array rule are (for now) the only ones that accept nested rules
  phones: {
    // The first rule level refers to evaluation of array itself
    alias: "Phones",
    min: 1,
    max: 5,
    // The rules under '_' property will be used to evaluate all items into the array
    _: {
      alias: "Phone", // Note the singularization... Guess the reason :)
      type: "string",
      min: 18,
      max: 18
    },
    // The rules under '_i' where 'i' is the index of array will overwrite the '_' rules (all they)
    // at the specified index
    _2: {
      alias: "Phone",
      type: "string",
      min: 16,
      max: 16
    }
  }
};
```

Now let's check our suspicious object

```js
// Let's assume 'app' as a vue instance...
app.$validate(aPerson, personRule); // undefined
```

A `undefined` signifies that all is ok with our person object.
Let's see what happens if:

```js
aPerson.birth = new Date();
```

Then...

```js
app.$validate(aPerson, personRule); // ["Birth can not be major than 2011-01-01T00:00:00.000Z"]
```

Let's do more :smiling_imp:

```js
aPerson.name = "";
aPerson.gender = "X";
aPerson.address.zipCode = null;
aPerson.phones[1] = 987765;
```

Now...

```js
app.$validate(aPerson, personRule);
```

```js
[
  "Full name can not be empty",
  "Full name must have at least 3 character(s)",
  "Gender is invalid",
  "Birth can not be major than 2011-01-01T00:00:00.000Z",
  "Zip code can not be empty",
  "Zip code must be of type 'string'",
  "value for rule 'pattern' must be a text",
  "Phones 2 Phone must be of type 'string'",
  "Phones 2 Phone must be major than 17"
];
```

See the [docs](https://geandre.github.io/vue-check/) for more details

It's all for now fellows...

#### Related docs

- [Helpers.getType()](https://geandre.github.io/vue-check/module-Helpers.html#~getType)
- [Checkers.isEmpty()](https://geandre.github.io/vue-check/module-Checkers.html#~isEmpty)
- [Regexp.email](https://geandre.github.io/vue-check/regexps.js.html)
- [Dictionaries/Locale Modules](https://github.com/geandre/vue-check/tree/master/src/locales)

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

- **Geandre Miranda** **[Homepage](http://geandre.github.io)**

## License

MIT
