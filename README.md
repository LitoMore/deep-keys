# deep-keys

[![NPM version][npm-image]][npm-url]
[![Build status][github-actions-image]][github-actions-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

> Creates an array composed of the own enumerable property names(including nested) of an object.

**Note:** This kit works great with [obj-parse](https://github.com/a8m/obj-parse) _(get and set object properties in a fast and elegant way)._

## Install

```shell
npm install deep-keys
```

## Usage

##### `deepKeys(obj, intermediate[optional])`

```js
import deepKeys from "deep-keys";

const obj1 = {
  a: 1,
  b: { c: 1 },
  c: { d: { e: 1 }, f: 1 },
  d: { e: { f: { g: 1, h: 2 } } },
  e: 2,
  f: { g: [] },
};
deepKeys(obj1);
//=> ['a', 'b.c', 'c.d.e', 'c.f', 'd.e.f.g', 'd.e.f.h', 'e', 'f.g']

const obj2 = {
  type: "customer",
  details: {
    name: "Ariel",
    age: 26,
    address: { city: "Tel Aviv", country: "Israel" },
  },
  isActive: true,
};
deepKeys(obj2);
//=> ['type', 'details.name', 'details.age', 'details.address.city', 'details.address.country', 'isActive']

// intermediate example
const obj3 = { a: { b: { c: 1 } } };
deepKeys(obj3); //=> [ 'a.b.c' ]
deepKeys(obj3, true); //=> [ 'a', 'a.b', 'a.b.c' ]

// Dots in key names get escaped
const obj4 = { "a.": { b: 1 } };
deepKeys(obj4); //=> [ 'a\\..b' ]
```

## License

MIT © [Ariel Mashraki](https://github.com/a8m)

[npm-image]: https://img.shields.io/npm/v/deep-keys.svg?style=flat-square
[npm-url]: https://npmjs.org/package/deep-keys
[github-actions-image]: https://github.com/a8m/deep-keys/actions
[github-actions-url]: https://img.shields.io/github/actions/workflow/status/a8m/deep-keys/main.yml?branch=master&logo=github&label=CI&style=flat-square
[license-image]: https://img.shields.io/npm/l/deep-keys.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/deep-keys.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/deep-keys
