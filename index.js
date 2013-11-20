var fs = require('fs');
var path = require('path');

var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
var UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var LETTERS = LOWER_LETTERS.concat(UPPER_LETTERS);
var WORD_CHARS = [ '_' ].concat(NUMBERS).concat(LETTERS);

// Requires the wordlist package on Linux.
var possibleWordsFiles = [ '/usr/share/dict/words', '/usr/dict/words' ];

var _wordsFile;
exports.__defineGetter__('wordsFile', function () {
  if (!_wordsFile) {
    var existingWordsFiles = possibleWordsFiles.filter(function (file) {
      return fs.existsSync(file);
    });

    if (existingWordsFiles.length) {
      _wordsFile = existingWordsFiles[0];
    } else {
      throw new Error('Words file not found in ' + possibleWordsFiles.join(', '));
    }
  }

  return _wordsFile;
});

var _words;
exports.__defineGetter__('words', function () {
  if (!_words) {
    var nonLetter = /[^a-zA-Z]/;
    _words = fs.readFileSync(exports.wordsFile, 'utf8').split('\n').filter(function (word) {
      return !nonLetter.test(word);
    });
  }

  return _words;
});

var _wordsByLength;
exports.__defineGetter__('wordsByLength', function () {
  if (!_wordsByLength) {
    _wordsByLength = exports.words.reduce(function (memo, word) {
      var length = word.length;
      if (!memo[length]) memo[length] = [];
      memo[length].push(word);
      return memo;
    }, {});
  }

  return _wordsByLength;
});

exports.pick = function (array) {
  return array[exports.number(array.length)];
};

exports.number = function (exclusiveMax) {
  return Math.floor(Math.random() * exclusiveMax);
};

exports.letter = function () {
  return exports.pick(LETTERS);
};

exports.wordChar = function () {
  return exports.pick(WORD_CHARS);
};

exports.word = function (length) {
  length = length || Math.max(2, exports.number(12));
  return exports.pick(exports.wordsByLength[length]);
};

exports.sentence = function (length) {
  length = Math.max(3, length || exports.number(12));

  var words = [];
  for (var i = 0; i < length; i++) {
    words.push(exports.word(exports.number(12)));
  }

  return words.join(' ');
};

exports.gender = function () {
  return Math.random() > 0.5 ? 'male' : 'female';
};

var names = require('./data/names');

exports.givenName = function (gender) {
  gender = gender || exports.gender();
  return exports.pick(gender === 'male' ? names.male : names.female);
};

exports.familyName = function () {
  return exports.pick(names.family);
};

exports.name = function (gender) {
  return [ exports.givenName(gender), exports.familyName() ].join(' ');
};

exports.emailAddress = function () {
  return (exports.givenName() + '@' + exports.word() + '.com').toLowerCase();
};
