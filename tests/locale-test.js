var expect = require('expect');
var grand = require('../index');

var LOCALES = require('../data/locales').locales;

describe('grand.locale', function () {
  it('returns a random locale', function () {
    expect(LOCALES).toInclude(grand.locale());
  });

  describe('when given a language code', function () {
    it('returns a locale in that language code', function () {
      expect(grand.locale('en')).toMatch(/^en-/);
    });
  });
});
