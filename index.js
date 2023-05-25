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

app.get('/api/:date?', (req, res) => {
  let inputDate;
  const { date } = req.params; // Extract the 'date' parameter from the request

  if (!date) {
    // If 'date' parameter is not provided, use the current date and time
    inputDate = new Date();
  } else {
    // If 'date' parameter is provided, parse it into a Date object
    const parsedDate = isNaN(date) ? date : parseInt(date); // Check if 'date' is a valid number
    inputDate = new Date(parsedDate);
  }

  if (inputDate.toString() === 'Invalid Date') {
    // Check if the parsed date is valid
    return res.json({ error: 'Invalid Date' }); // Return an error response if the date is invalid
  }

  // Convert the input date to Unix timestamp and UTC string
  const unixTimestamp = inputDate.getTime();
  const utcString = inputDate.toUTCString();

  // Send the response with the Unix timestamp and UTC string
  res.json({ unix: unixTimestamp, utc: utcString });
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
