// index.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unixTimestamp, utcDate;

  if (date) {
    // Check if the date is a valid number or valid date string
    if (!isNaN(date)) {
      // Handle Unix timestamp input (milliseconds)
      unixTimestamp = parseInt(date);
      utcDate = new Date(unixTimestamp).toUTCString();
    } else if (!isNaN(Date.parse(date))) {
      // Handle date string input
      unixTimestamp = new Date(date).getTime();
      utcDate = new Date(unixTimestamp).toUTCString();
    } else {
      // If the date string is invalid
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: unixTimestamp, utc: utcDate });
  } else {
    // If no date is provided, return the current date
    let currentDate = new Date();
    unixTimestamp = currentDate.getTime();
    utcDate = currentDate.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcDate });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
