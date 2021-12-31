// ./src/index.js
console.log("hwllo")
// importing the dependencies
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session')
const store = new session.MemoryStore();
const {startDatabase} = require('./database/mongo');
const {insertWish, getWishs} = require('./database/wish');
const {deleteWish, updateWish, loginUser} = require('./database/wish');
const {getDatabase} = require('./database/mongo');

// defining the Express app
const app = express();


// enabling CORS for all requests
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// adding Helmet to enhance your API's security
app.use(helmet());

app.use(cookieParser('Keep it secret'));

// using bodyParser to parse JSON bodies into JS objects, we always need to parse bodies before making any HTTP Requests
app.use(bodyParser.json({ // need to use json
  extended: true
}));


// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Creating sessions
app.use(session({secret:'Keep it secret' // used to sign the cookie
,
cookie: {maxAge: 30000, secure : false}, // maximum age of cookie (automatically signs user out after a period of time)
saveUninitialized:false, // generates new session id every time there is a request to the server
resave: false,
store
}))

// defining an endpoint to return all wishes
// If the user tries to go to wishlist without signing up

app.get('/', async (req, res) => { 
  const isLoggedin = await req.session.loggedIn
  const username = await req.session.username
  const password = await req.body.password


  // console.log(store)
  console.log(req.sessionID)
  if(isLoggedin){
  res.send(await getWishs(username, password));
  }
  else {
    res.send({"loggedIn" : "false"})
  }

});
// signing up for an account
app.post('/signup', async (req, res) => {
  const newAcc = req.body//req.body
  console.log(req.headers)
  // console.log(req)
  await insertWish(newAcc);
  // res.send(newWish)
  res.send({ message: 'New Account inserted.' });
});

// posting an Wish to the API 
app.post('/postWish', async (req, res) => {
  const username = await req.session.username
  const newWish = req.body//req.body

  // console.log(req)
  await insertWish(newWish, username);
  // res.send(newWish)
  res.send({ message: 'New Wish inserted.' });
});

// logging in 
app.post('/signin', async (req, res) => {
  // find if the username even exists
  const username = req.body.username
  const password = req.body.password
  const didLogin = await loginUser(username, password)

  if (didLogin){
    res.locals.username = req.body.username
    req.session.loggedIn = true
    req.session.username = res.locals.username
    console.log(req.sessionID)
    console.log(store)
    res.json(req.session)
    // res.redirect('/')
    // cannot set header issue
  }
  else{
    res.sendStatus(401)

  }
    // res.send(newWish)
});


// endpoint to delete an Wish
app.delete('/', async (req, res) => {
  console.log(req.body)
  await deleteWish(req.body);
  res.send({ message: 'Wish removed.' });
});

// endpoint to update an Wish

app.put('/', async (req, res) => {
  // the values that are sent to update the values in the server are in Updated Wish
  const updatedWish = req.body;
  await updateWish(req.params.id, updatedWish);
  // the API sends back to the user that the Wish has been updated
  res.send({ message: 'Wish updated.' });
});


// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // await insertWish({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => { // the express server is running on port 3001
    console.log('listening on port 3001');
  });
});

