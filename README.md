[![npm package](https://img.shields.io/npm/v/grand.svg?style=flat-square)](https://www.npmjs.org/package/grand)
[![build status](https://img.shields.io/travis/mjackson/grand.svg?style=flat-square)](https://travis-ci.org/mjackson/grand)
[![dependency status](https://img.shields.io/david/mjackson/grand.svg?style=flat-square)](https://david-dm.org/mjackson/grand)
[![code climate](https://img.shields.io/codeclimate/github/mjackson/grand.svg?style=flat-square)](https://codeclimate.com/github/mjackson/grand)

[grand](https://github.com/mjackson/grand) is a JavaScript module for generating random data.

### Usage

```js
var grand = require('grand');

grand.number(exclusiveMax)    // A random, positive number less than the exclusiveMax (optional)
grand.integer(exclusiveMax)   // A random, positive integer less than the exclusiveMax (optional)
grand.pick(array)             // A random item from the given array
grand.letter()                // A random letter [A-Za-z]
grand.wordChar()              // A random word character [A-Za-z0-9_]
grand.word(length)            // A random word from the system dictionary of the given length (optional)
grand.sentence(maxWords)      // A random sentence with the given number of words (optional)
grand.gender()                // Either "male" or "female"
grand.givenName(gender)       // A random given name for the given gender (optional)
grand.familyName()            // A random family name
grand.name(gender)            // A random full name of the given gender (optional)
grand.emailAddress()          // A random email address
grand.locale(language)        // A random locale for a given language (optional)
grand.timezone(region)        // A random timezone on a region (optional)
```

### Installation

Using [npm](https://www.npmjs.org/):

    $ npm install grand

### Issues

Please file issues on the [issue tracker on GitHub](https://github.com/mjackson/grand/issues).

### Tests

To run the tests in node:

    $ npm install
    $ npm test

### License

[MIT](http://opensource.org/licenses/MIT)
