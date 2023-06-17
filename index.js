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

const isInvalidDate = (date) => isNaN(date.getTime());

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    // Empty date parameter, return current time
    date = new Date();
  } else if (isNaN(Number(dateString))) {
    // Non-numeric date parameter, parse as date string
    date = new Date(dateString);
  } else {
    // Numeric date parameter, parse as UNIX timestamp
    date = new Date(Number(dateString));
  }

  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  // Empty date parameter, return current time
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
