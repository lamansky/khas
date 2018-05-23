# khas

Checks for the existence of one or more keys in a Map, Object, or other collection. Supports nesting, loose key matching, and more.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i khas
```

## API

The module exports a function (`has()`) that has other functions attached to it as methods (e.g. `has.any()`).

### `has()`

#### Parameters

1. Bindable: `collection` (Array, iterator, Map, Object, Set, string, Typed Array, or WeakMap): The key-value collection from which to retrieve a value.
2. `keychain` (any, or array of any): A key to check, or an array of nested keys.
3. Optional: Object argument:
    * `arrays` / `maps` / `sets` / `weakMaps` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set`/`WeakMap` (respectively).
    * `get` (function): A callback which, if provided, will override the built-in code that fetches an individual key from a collection. Use this if you need to support collections whose custom APIs preclude the use of parameters like `maps`. The callback will be called with five arguments: the collection, the key, the options object, the fallback to return if the key is not found, and a callback for the built-in get behavior (to which your custom `get` callback can defer if it determines that it doesn’t need to override the default behavior after all).
    * `inObj` (boolean): Whether or not to search inherited properties if `collection` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `loose` (boolean): Whether or not to evaluate keys loosely (as defined by `looselyEquals`). Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.

#### Return Value

Returns `true` if a value exists at the location indicated by `keychain`, otherwise `false`.

#### Example

```javascript
const has = require('khas')

const map = new Map()
map.set('mapKey', {objKey: 'string'})

has(map, ['mapKey', 'objKey']) // true
```

### `has.any()`

Has the same signature as the main function, except that the second parameter is called `keychains` and expects an array of keys or keychain arrays. Returns `true` if at least one of them points to a value, otherwise `false`.

#### Example

```javascript
const has = require('khas')

has.any({c: 3, d: 4}, [['a', 'subkey'], 'b', 'c']) // true
```

The function tries the keys `a.subkey`, `b`, and `c` in that order. Since there is a value located at `c`, the function returns `true`.

### `has.in()`

This method is an alias for calling the main `has()` method with the `inObj` option set to `true`.

### `has.any.in()`

This method is an alias for calling `has.any()` with the `inObj` option set to `true`.

## Related

The “k” family of modules works on keyed/indexed collections.

* [kget](https://github.com/lamansky/kget)
* [kedit](https://github.com/lamansky/kedit)
* [kset](https://github.com/lamansky/kset)
* [kinc](https://github.com/lamansky/kinc)
* [kdel](https://github.com/lamansky/kdel)

The “v” family of modules works on any collection of values.

* [vhas](https://github.com/lamansky/vhas)
* [vget](https://github.com/lamansky/vget)
* [vsize](https://github.com/lamansky/vsize)
* [vadd](https://github.com/lamansky/vadd)
* [vdel](https://github.com/lamansky/vdel)
