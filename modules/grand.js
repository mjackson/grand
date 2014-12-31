var FAMILY_NAMES = require('./data/names').family;
var FEMALE_NAMES = require('./data/names').female;
var MALE_NAMES = require('./data/names').male;
var LOCALES = require('./data/locales').locales;
var TIMEZONES = require('./data/timezones').timezones;
var NUMBERS = '1234567890'.split('');
var LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
var UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var LETTERS = LOWER_LETTERS.concat(UPPER_LETTERS);
var WORD_CHARS = [ '_' ].concat(NUMBERS).concat(LETTERS);

var _words;
function randomWords() {
  if (!_words) {
    if (typeof window === 'undefined') {
      var fs = require('fs');

      // Requires the wordlist package on Linux.
      var possibleWordsFiles = [ '/usr/share/dict/words', '/usr/dict/words' ];
      var existingWordsFiles = possibleWordsFiles.filter(function (file) {
        return fs.existsSync(file);
      });

      if (!existingWordsFiles.length)
        throw new Error('grand: Words file not found in ' + possibleWordsFiles.join(', '));

      var wordsFile = existingWordsFiles[0];
      var allLetters = /^[a-zA-Z]+$/;

      _words = fs.readFileSync(wordsFile, 'utf8').split('\n').filter(function (word) {
        return allLetters.test(word);
      });
    } else {
      throw new Error('grand: Needs some random words');
    }
  }

  return _words;
}

var _wordsByLength;
function randomWordsByLength() {
  if (!_wordsByLength) {
    _wordsByLength = randomWords().reduce(function (memo, word) {
      var length = word.length;

      if (memo[length]) {
        memo[length].push(word);
      } else {
        memo[length] = [ word ];
      }

      return memo;
    }, {});
  }

  return _wordsByLength;
}

function randomNumber(exclusiveMax) {
  return Math.random() * (exclusiveMax || 1);
}

function randomInteger(exclusiveMax) {
  return randomNumber(exclusiveMax) | 0;
}

function randomArrayItem(array) {
  return array[randomInteger(array.length)];
}

function randomLetter() {
  return randomArrayItem(LETTERS);
}

function randomWordChar() {
  return randomArrayItem(WORD_CHARS);
}

function randomWord(length) {
  length = length || Math.max(2, randomInteger(12));

  var choices;
  do {
    choices = randomWordsByLength[length];
    length -= 1;
  } while (!choices); // Make sure we have a valid length.

  return randomArrayItem(choices);
}

function randomSentence(maxWords) {
  maxWords = Math.max(3, maxWords || randomInteger(12));

  var words = [];
  for (var i = 0; i < maxWords; i++)
    words.push(randomWord(randomInteger(12)));

  return words.join(' ');
}

function randomGender() {
  return randomNumber() > 0.5 ? 'male' : 'female';
}

function randomGivenName(gender) {
  gender = gender || randomGender();
  return randomArrayItem(gender === 'male' ? MALE_NAMES : FEMALE_NAMES);
}

function randomFamilyName() {
  return randomArrayItem(FAMILY_NAMES);
}

function randomName(gender) {
  return [ randomGivenName(gender), randomFamilyName() ].join(' ');
}

function randomEmailAddress(tld) {
  tld = tld || '.com';
  return (randomGivenName() + '@' + randomWord() + '.com').toLowerCase();
}

function randomLocale(region) {
  var choices = LOCALES.slice(0);

  if (region) {
    choices = choices.filter(function (locale) {
      return locale.split('-')[0] === region;
    });
  }

  return randomArrayItem(choices);
}

function randomTimezone(continent) {
  var choices = TIMEZONES.slice(0);

  if (continent) {
    choices = choices.filter(function (zone) {
      return zone.split('/')[0] === continent;
    });
  }

  return randomArrayItem(choices);
}

module.exports = {
  words: randomWords,
  wordsByLength: randomWordsByLength,
  number: randomNumber,
  num: randomNumber,
  integer: randomInteger,
  int: randomInteger,
  arrayItem: randomArrayItem,
  pick: randomArrayItem,
  letter: randomLetter,
  wordChar: randomWordChar,
  word: randomWord,
  sentence: randomSentence,
  gender: randomGender,
  givenName: randomGivenName,
  familyName: randomFamilyName,
  name: randomName,
  emailAddress: randomEmailAddress,
  locale: randomLocale,
  timezone: randomTimezone
};
