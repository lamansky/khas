'use strict'

const assert = require('assert')
const has = require('.')

describe('has()', function () {
  it('should check Array for single index', function () {
    assert(has(['a', 'b'], 1))
    assert(!has(['a', 'b'], 2))
  })

  it('should check Array for index chain', function () {
    assert(has([['value']], [0, 0]))
    assert(!has([['value']], [1, 0]))
    assert(!has([['value']], [0, 1]))
  })

  it('should check Object for single key', function () {
    assert(has({a: 1}, 'a'))
    assert(!has({a: 1}, 'b'))
  })

  it('should check Object for key chain', function () {
    assert(has({a: {b: 1}}, ['a', 'b']))
    assert(!has({a: {b: 1}}, ['a', 'c']))
  })

  it('should check Map for single key', function () {
    assert(has(new Map([['a', 1]]), 'a'))
    assert(!has(new Map([['a', 1]]), 'b'))
  })

  it('should check Map for key chain', function () {
    const map = new Map([['one', new Map([['two', 'value']])]])
    assert(has(map, ['one', 'two']))
    assert(!has(map, ['one', '2']))
  })

  it('should check Set for single index', function () {
    assert(has(new Set(['a', 'b']), 1))
    assert(!has(new Set(['a', 'b']), 2))
  })

  it('should check string for character index', function () {
    assert(has('test', 1))
    assert(!has('test', 5))
  })

  it('should check WeakMap for single key', function () {
    const key = {}
    const wm = new WeakMap([[key, 'value']])
    assert(has(wm, key))
    assert(!has(wm, {}))
  })

  it('should support mixed nested collection types', function () {
    const map = new Map()
    map.set('mapKey', {objKey: 'string'})
    assert(has(map, ['mapKey', 'objKey', 5]))
  })

  it('should check for an equivalent key if `loose` is true', function () {
    const map = new Map([[{key: true}, 'value']])
    assert(!has(map, {key: true}))
    assert(has(map, {key: true}, {loose: true}))
    assert(!has(map, {key: false}, {loose: true}))
  })

  it('should support the bind operator', function () {
    assert(has.call({a: 1}, 'a'))
    assert(!has.call({a: 1}, 'b'))
  })

  describe('#in()', function () {
    it('should include inherited Object property', function () {
      class Cls {
        get key () { return 'value' }
      }
      assert(!has(new Cls(), 'key'))
      assert(has.in(new Cls(), 'key'))
      assert(!has.in(new Cls(), 'no'))
    })
  })

  describe('#any()', function () {
    it('should check Array for any single index', function () {
      assert(has.any(['a', 'b'], [1, 2]))
      assert(!has.any(['a', 'b'], [2, 3]))
    })

    it('should check Array for any index chain', function () {
      assert(has.any([['value']], [[1, 0], [0, 0]]))
      assert(!has.any([['value']], [[1, 0], [1, 1]]))
    })

    it('should check Object for any single key', function () {
      assert(has.any({a: 1}, ['a', 'b']))
      assert(!has.any({a: 1}, ['b']))
    })

    it('should check Object for any key chain', function () {
      assert(has.any({a: {b: 1}}, [['c'], ['a', 'b']]))
      assert(!has.any({a: {b: 1}}, [['a', 'c']]))
    })

    it('should check Map for any single key', function () {
      assert(has.any(new Map([['a', 1]]), ['b', 'a']))
      assert(!has.any(new Map([['a', 1]]), ['b', 'c']))
    })

    it('should check Map for any key chain', function () {
      const map = new Map([['one', new Map([['two', 'value']])]])
      assert(has.any(map, [[1, 2], ['one', 'two']]))
      assert(!has.any(map, [[1, 2]]))
    })

    it('should check Set for any single index', function () {
      assert(has.any(new Set(['a', 'b']), [1, 2]))
      assert(!has.any(new Set(['a', 'b']), [2]))
    })

    it('should check string for any character index', function () {
      assert(has.any('test', [1, 2]))
      assert(!has.any('test', [5]))
    })

    it('should check WeakMap for any single key', function () {
      const key = {}
      const wm = new WeakMap([[key, 'value']])
      assert(has.any(wm, [{}, key]))
      assert(!has.any(wm, [{}]))
    })

    it('should support mixed nested collection types', function () {
      const map = new Map()
      map.set('mapKey', {objKey: 'string'})
      assert(has.any(map, [['key'], ['mapKey', 'objKey', 5]]))
    })

    it('should check for an equivalent key if `loose` is true', function () {
      const map = new Map([[{key: true}, 'value']])
      assert(!has.any(map, [{key: true}]))
      assert(has.any(map, [{key: true}], {loose: true}))
      assert(!has.any(map, [{key: false}], {loose: true}))
    })

    it('should support the bind operator', function () {
      assert(has.call({a: 1}, 'a'))
      assert(!has.call({a: 1}, 'b'))
    })

    describe('#in()', function () {
      it('should include inherited Object property', function () {
        class Cls {
          get key () { return 'value' }
        }
        assert(!has.any(new Cls(), ['key']))
        assert(has.any.in(new Cls(), ['key2', 'key']))
        assert(!has.any.in(new Cls(), ['no']))
      })
    })
  })
})
