grand is a [node.js](http://nodejs.org/) module for generating random data.

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
grand.locale(region)          // A random locale for a given region (optional)
grand.timezone(continent)     // A random timezone on a continent (optional)
grand.uuid()                  // A random uuid (v4) using node-uuid and accepting the v4 parameters (optional)
