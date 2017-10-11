//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert'

import decorate from '../utils/decorate'

suite('Decoration Test', () => {
  // Defines a Mocha unit test
  test('should work with defaults', () => {
    assert.equal(decorate('a', 1), 'A')
    assert.equal(decorate('a', 6), '-- A --')
    assert.equal(decorate('a', 5), '- A --')
    assert.equal(decorate('aa', 5), '- AA -')
  })
})
