var expect = require('expect');
var grand = require('../grand');

var TIMEZONES = require('../data/timezones').timezones;

describe('grand.timezone', function () {
  it('returns a random timezone', function () {
    expect(TIMEZONES).toInclude(grand.timezone());
  });
});
