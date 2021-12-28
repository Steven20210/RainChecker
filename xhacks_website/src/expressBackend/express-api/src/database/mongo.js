// import libraries
const mongoose = require('mongoose')
//intiate database variable
let database = null;

// initialize the uri and the client variables
const uri = "mongodb://localhost:27017"
// new MongoClient instance 

// function runs in the background
async function startDatabase() {

  // Connect to the MongoDB cluster
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  database = mongoose.connection
  console.log("Mongo successfully connected")
  // connection = await client.connect();
  // database = connection.db();
  
  // await listDatabases(client);
  

}

async function getDatabase() {
    // if there is no db instantiated then wait for it
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};