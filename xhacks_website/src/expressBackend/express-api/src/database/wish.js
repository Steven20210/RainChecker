const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');


const collectionName = 'wishes';

//inserts an element
async function insertWish(wish, user) {
  const database = await getDatabase();
  wish['username'] = user
  const {insertedId} = await database.collection(collectionName).insertOne(wish);
  return insertedId;
}

//gets an element
async function getWishs(user, pass) {
  const database = await getDatabase();
  // return's user's wishes and not the user account
  const result = await database.collection(collectionName).find({ $and: [{username: {$eq: user}}, {password:  {$exists: false}}]}).toArray();
  // console.log(result)
  return result

}

// delete Wish
async function deleteWish(wish) {
  const database = await getDatabase();

  // deletes the id at that ObjectId
  await database.collection(collectionName).deleteOne(
    wish
  );
}

  // find if the username even exists
  async function loginUser(user, pass){
    const database = await getDatabase();
    const result = await database.collection(collectionName).find({ $and: [{username: {$eq: user}}, {password:  {$eq: pass}}]}).toArray() 

  // checks if there are no users returned (array.length = 0)
  if(result.length != 0){
    console.log("true")
    return true
  }
  else{
    console.log("false")
    return false
  }
    
}


//updates the Wish
async function updateWish(id, wish) {
  const database = await getDatabase();
  // get database
  delete wish._id;
  // delete the id first

  // then update the database with a new object id
  // also then inserts the new Wishd at the tail of the value
  await database.collection(collectionName).update(
    { _id: new ObjectId(wish), },
    {
      $set: {
        ...wish,
      },
    },
  );
}

module.exports = {
  insertWish,
  getWishs,
  deleteWish,
  updateWish,
  loginUser
};