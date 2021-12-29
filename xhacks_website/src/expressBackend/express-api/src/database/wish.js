const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');


const collectionName = 'wishes';

//inserts an element
async function insertAd(ad) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

//gets an element
async function getAds() {
  const database = await getDatabase();
  
  return await database.collection(collectionName).find({}).toArray();
}

// delete ad
async function deleteAd(id) {
  const database = await getDatabase();

  // deletes the id at that ObjectId
  await database.collection(collectionName).deleteOne(
    id
  );
}

//updates the ad
async function updateAd(id, ad) {
  const database = await getDatabase();
  // get database
  delete ad._id;
  // delete the id first

  // then update the database with a new object id
  // also then inserts the new add at the tail of the value
  await database.collection(collectionName).update(
    { _id: new ObjectId(id), },
    {
      $set: {
        ...ad,
      },
    },
  );
}

module.exports = {
  insertAd,
  getAds,
  deleteAd,
  updateAd
};