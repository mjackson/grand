/**
 * Fetch and output formatted language data used by grand.
 *
 * Language tags are presented according to RFC5646:
 *   http://www.inter-locale.com/ID/rfc5646.html
 *
 * The language and region tags are used in the output
 * according to ISO-639 and ISO-3166-1.
 *
 * Usage to inspect:
 *  $ node script/fetch_languages.js
 *
 * Usage to update:
 *  $ node script/fetch_languages.js >> data/languages.json
 *
 * @author Mattijs Hoitink <mattijs@monkeyandmachine.com>
 */
var request = require('request');
var parse   = require('xml2js').parseString;

// We use cldr data from the Unicode consortium
var languageDataUrl = 'http://unicode.org/repos/cldr/trunk/common/supplemental/supplementalData.xml';

// Fetch the data
request.get(languageDataUrl, function(error, response, body) {
  if (error) {
    // Exit silently to prevent corrupted data when piping
    process.stderr.write('A request error occurred: ' + error.message);
    process.exit(1001);
  }

  parse(body, function(error, result) {
    if (error) {
      // Exit silently to prevent corrupted data when piping
      process.stderr.write('A parse error occurred: ' + error.message);
      process.exit(1002);
    }

    var languageData = result.supplementalData.languageData[0].language;
    var languages = [];

    languageData.forEach(function(data) {
      var lang = data['$'].type;
      var territories = data['$'].territories || '';

      // Split the territories attribute into regions based on whitespace
      var regions = territories.split(/[\s\t\n]+/);

      regions.forEach(function(region) {
        // Some regions can be empty due to missing or empty territory tag
        if (region.trim().length > 0) {
          languages.push(lang + '-' + region);
        }
      });
    });

    // Complete structure that will be outputted
    var structure = {
      'tags': languages
    };

    // Output data structure to STDOUT so it can be inspected or piped
    process.stdout.write(JSON.stringify(structure, null, 2));
  });
});
