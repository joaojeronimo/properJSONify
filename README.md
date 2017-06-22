# properJSONify

[![Build Status](https://travis-ci.org/joaojeronimo/properJSONify.svg?branch=master)](https://travis-ci.org/joaojeronimo/properJSONify)

Goes through a javascript object (recursively) and transforms every key into it's `camelCase` version (also takes a custom key transformation function), and sorts keys alphabetically (also takes a custom compare function).

More often than not you'll have to work with a service that outputs `{ "ThingsLike": "this" }`
or `{ "things_like": "this" }` or even god forbid `{ "things.like": "this" }`. When that happens,
use `properJSONify`.

## Installation

```bash
yarn add properJSONify
```

## API

```javascript
properJSONify(obj: object | array, customKeyTransform: function, customSortCompare: function)
```

## Example

```javascript
const properJSONify = require('properJSONify');
const obj = {
  WordsAndWords: 1,
  nested_object: {
    'weird.key': 2,
  },
};

properJSONify(obj);
/*
  Output
  {
    wordsAndWords: 1,
    nestedObject: {
      weirdKey: 2,
    },
  }
*/
```

## Custom key transformation

If camelCase is not what you're after then just pass a transformation function as the
second argument to properJSONify. For instance if you want to prefix all keys with
`_`, you would do:

```javascript
properJSONify({ a: 1 }, key => `_${key}`);
/*
  Output:
  { _a: 1 }
*/
```

## Custom key sorting

By default `properJSONify` will sort object keys alphabetically,
but you can also use a custom sort function that will be passed to the normal [array sort method](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):

```javascript
properJSONify({ z: 1, y: 2 }, null, (a, b) => 1);
/*
  Output:
  { y: 2, z: 1 }
*/
```

## Features

- Traverses both objects and arrays recursively;
- Does not mutate the original object (tests use deepFreeze to be sure);
- Allows custom key transformation functions;
- Prefixes a key with `_` in case of an existing duplicate;
