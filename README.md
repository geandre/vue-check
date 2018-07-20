# VueCheck

A Vue plugin to check data objects

## Installing

Into a Vue 2 project

```
npm install --save github:geandre/vue-check
```

```
import VueCheck from 'vue-check';

Vue.use(VueCheck, { lang: 'en-US', format: 'detailed' });
```

## Getting Started

VueCheck exposes an instance property called $check with some checker methods:

```
vm.$check.isString("")      // true
vm.$check.isBoolean(false)  // true
vm.$check.isEmpty(null)     // true
```

> Check the docs at section Checkers for more.

Also a property called $validate is provided with a function that can check an object based in a rule object, and returning a list of inconsistency:

```
const value = {
  name: "Geandre Miranda",
  age: 23
}

const rules = {
  name: {                 // The rule key must match the value property or be a path with dot notation as 'prop.subprop'
    alias: 'Full Name',   // An alias to the field, if none is provided the rule key is used
    type: 'string',       // MUST BE a string
    empty: false,         // CAN NOT BE empty
    min: 3,               // For type String OR Array refers to length property
    max: 255              // For type String OR Array refers to length property
  },
  age: {
    alias: 'How old',
    type: 'integer',      // integer and float are available
    empty: false,
    min: 18,              // For Numeric types refer to literal value
  }
}

vm.$validate(value, rules); // undefined
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

- **Geandre Miranda**

## License

Copyright © Geandre Miranda - All rights reserved.
