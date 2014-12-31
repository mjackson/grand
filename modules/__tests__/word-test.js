var assert = require('assert');
var grand = require('../grand');

describe('grand.word', function () {
  it('returns a random word', function () {
    assert(grand.word());
  });
});
