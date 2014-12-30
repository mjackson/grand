/* jshint -W002 */
/**
 * Fetch and output formatted timezone data used by grand.
 *
 * Timezone data is taken from moment-timezone, which in turn
 * takes it data from the tzdb through a grunt task.
 *
 * - https://github.com/moment/moment-timezone/blob/develop/moment-timezone.json
 * - https://github.com/eggert/tz
 */
var request = require('request');

var TIMEZONE_DATA_URL = 'https://raw.githubusercontent.com/moment/moment-timezone/master/data/unpacked/latest.json';

request.get(TIMEZONE_DATA_URL, function (error, response, body) {
  if (error) {
    console.error('A request error occurred: ' + error.message);
    process.exit(1);
  }

  var timezones;
  try {
    timezones = JSON.parse(body).zones.map(function (zone) {
      return zone.name;
    });
  } catch (error) {
    console.error('A parse error occurred: ' + error.message);
    process.exit(1);
  }

  console.log(
    JSON.stringify({ timezones: timezones }, null, 2)
  );
});
