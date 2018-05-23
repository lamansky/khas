'use strict'

const get = require('kget')
const xfn = require('xfn')

const notFound = Symbol('notFound')

module.exports = xfn({
  optionArg: 2,
  optionProps: {in: {inObj: true}},
  pluralFirst: true,
  pluralArg: 1,
  pluralProp: 'any',
}, (obj, keychains, options = {}) =>
  get.any(obj, keychains, {...options, elseReturn: notFound, elseThrow: null, preferStrict: false, reverse: false}) !== notFound
)
