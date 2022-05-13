const assert = require('assert');
const joinWithPlus = require('../script.js');

describe('joinWithPlus', () => {
  it('Replace spaces with plus character "+".', () => {
    // Setup
    const input = 'This is test string.';
    const expectedResult = 'This+is+test+string.';

    // Exercise
    const result = joinWithPlus(input);

    // Verification
    assert.strictEqual(result, expectedResult);
  })
});