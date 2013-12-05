/**
 * Fetch and output formatted timezone data used by grand.
 *
 * Timezone data is taken from moment-timezone, which in turn
 * takes it data from the tzdb through a grunt task.
 *
 * - https://github.com/moment/moment-timezone/blob/develop/moment-timezone.json
 * - https://github.com/eggert/tz
 *
 * Usage to inspect:
 *  $ node script/fetch_timezones.js
 *
 * Usage to update:
 *  $ node script/fetch_timezones.js > data/timezones.json
 *
 * @author Mattijs Hoitink <mattijs@monkeyandmachine.com>
 */
var request = require('request');

var timezoneDataUrl = 'https://raw.github.com/moment/moment-timezone/develop/moment-timezone.json';

request.get(timezoneDataUrl, function(error, response, body) {
  if (error) {
    // Exit silently to prevent corrupted data when piping
    process.stderr.write('A request error occurred: ' + error.message);
    process.exit(1001);
  }

  // Parse the body
  try {
    var data = JSON.parse(body);
  }
  catch (error) {
    // Exit silently to prevent corrupted data when piping
    process.stderr.write('A parse error occurred: ' + error.message);
    process.exit(1002);
  }

  // Convert moment-timezone structure to something simpler
  var structure = {
    names: Object.keys(data.zones)
  }

  // Output data structure to STDOUT so it can be inspected or piped
  process.stdout.write(JSON.stringify(structure, null, 2));
});
