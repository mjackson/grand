var expect = require('expect');
var grand = require('../grand');

var LOCALES = require('../data/locales').locales;

describe('grand.locale', function () {
  it('returns a random locale', function () {
    expect(LOCALES).toInclude(grand.locale());
  });
});

