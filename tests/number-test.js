var expect = require('expect');
var grand = require('../index');

describe('grand.number', function () {
  it('returns a number less than 1', function () {
    expect(typeof grand.number()).toBe('number');
    expect(grand.number()).toBeLessThan(1);
  });

  describe('when given a max of 0', function () {
    it('returns 0', function () {
      expect(grand.number(0)).toBe(0);
    });
  });

  describe('when given a max that is a positive integer', function () {
    it('always returns a number less than the max', function () {
      for (var i = 1; i < 100; ++i)
        expect(grand.number(i)).toBeLessThan(i);
    });
  });
});
