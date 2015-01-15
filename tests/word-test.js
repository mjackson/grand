var assert = require('assert');
var grand = require('../index');

describe('grand.word', function () {
  it('returns a random word', function () {
    assert(grand.word());
  });
});
