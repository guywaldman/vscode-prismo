//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert'

import decorate from '../utils/decorate'
import { defaultConfig } from '../utils/config'

const { dash } = defaultConfig

const toConfig : (string) => string = (line : string) => line.replace(/(-)/g, () => dash)

suite('Decoration Test', () => {
  // Defines a Mocha unit test
  test('should work with defaults', () => {
    assert.equal(decorate('a', 3), toConfig(' A '))
    assert.equal(decorate('a', 6), toConfig('-- A -'))
    assert.equal(decorate('a', 7), toConfig('-- A --'))
  })
  test('should not uppercase text when option is disabled', () => {
    assert.equal(decorate('a', 5), toConfig('- A -'))
    assert.equal(decorate('a', 5, { shouldUppercase: true }), toConfig('- A -'))
    assert.equal(decorate('a', 5, { shouldUppercase: false }), toConfig('- a -'))
  })
  test('should properly apply padding and dash', () => {
    assert.equal(decorate('foo', 11), '--- FOO ---')
    assert.equal(decorate('foo', 11, { padding: 2 }), '--  FOO  --')
    assert.equal(decorate('foo', 11, { dash: '~', padding: 2 }), '~~  FOO  ~~')
    assert.equal(decorate('Foo', 87, { shouldUppercase: false, padding: 2 }), toConfig(`${'-'.repeat(40)}  Foo  ${'-'.repeat(40)}`))
  })
})
