/**
 * Fetch and output formatted locale data used by grand.
 *
 * Language tags are presented according to RFC5646:
 *   http://www.inter-locale.com/ID/rfc5646.html
 *
 * The language and region tags are used in the output
 * according to ISO-639 and ISO-3166-1.
 */
var request = require('request');
var parseXML = require('xml2js').parseString;

// We use CLDR data from the Unicode consortium.
var LANGUAGE_DATA_URL = 'http://unicode.org/repos/cldr/trunk/common/supplemental/supplementalData.xml';

request.get(LANGUAGE_DATA_URL, function (error, response, body) {
  if (error) {
    console.error('A request error occurred: ' + error.message);
    process.exit(1);
  }

  parseXML(body, function (error, result) {
    if (error) {
      console.error('A parse error occurred: ' + error.message);
      process.exit(1);
    }

    var languageData = result.supplementalData.languageData[0].language;
    var locales = [];

    languageData.forEach(function (data) {
      var code = data.$.type;
      var territories = data.$.territories || '';

      // Split the territories attribute into regions based on whitespace
      var regions = territories.split(/[\s\t\n]+/);

      regions.forEach(function (region) {
        // Some regions can be empty due to missing or empty territory tag
        if (region.trim().length > 0)
          locales.push(code + '-' + region);
      });
    });

    console.log(
      JSON.stringify({ locales: locales }, null, 2)
    );
  });
});
