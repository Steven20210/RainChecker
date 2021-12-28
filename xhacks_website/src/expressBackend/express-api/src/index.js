// ./src/index.js
console.log("hwllo")
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/wish');
const {deleteAd, updateAd} = require('./database/wish');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects, we always need to parse bodies before making any HTTP Requests
app.use(bodyParser.json({ // need to use json
  extended: true
}));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', async (req, res) => { 
  res.send(await getAds());
});


// posting an ad to the API 
app.post('/', async (req, res) => {
  
  const newAd = req.body//req.body
  console.log(req.headers)
  // console.log(req)
  await insertAd(newAd);
  // res.send(newAd)
  res.send({ message: 'New ad inserted.' });
});



// endpoint to delete an ad
app.delete('/', async (req, res) => {
  console.log(req.body)
  await deleteAd(req.body);
  res.send({ message: 'Ad removed.' });
});

// endpoint to update an ad

app.put('/', async (req, res) => {
  // the values that are sent to update the values in the server are in Updated Ad
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  // the API sends back to the user that the ad has been updated
  res.send({ message: 'Ad updated.' });
});


// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // await insertAd({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => { // the express server is running on port 3001
    console.log('listening on port 3001');
  });
});

