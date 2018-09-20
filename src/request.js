var request = require('request');

// https://www.npmjs.com/package/haxxxxxxxxxxx
// https://www.npmjs.com/package/ha-cli

request('https://www.npmjs.com/package/ha-cli', function (error, response, body) {
  if (!error) {
    console.log("statusCode", response.statusCode === 200) // Show the HTML for the baidu homepage.
  }
})