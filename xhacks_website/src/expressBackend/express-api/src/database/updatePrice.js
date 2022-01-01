const {getDatabase} = require('./mongo');
const collectionName = 'wishes';
const {PythonShell} =require('python-shell');

const searchForPrice =  (item) => { 
let price = ''
//Here are the option object in which arguments can be passed for the python_test.js.
let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'C:/Users/Steven/Documents/GitHub/RainChecker/xhacks_website/src/expressBackend/express-api/src/scraper', //If you are having python_test.py script in same folder, then it's optional.
    args: [item] //An argument which can be accessed in the python file using sys.argv[1]
};


PythonShell.run('scraper.py', options, function (err, result){
      if (err) throw err;
      // result is an array consisting of messages collected
      //during execution of script.
      console.log('price: ', result.toString());  
      price = result.toString()    
      return price      
      
});
}
const sendEmail =  (item, new_price, email) => { 
    let price = ''
    //Here are the option object in which arguments can be passed for the python_test.js.
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
          scriptPath: 'C:/Users/Steven/Documents/GitHub/RainChecker/xhacks_website/src/expressBackend/express-api/src/email_users', //If you are having python_test.py script in same folder, then it's optional.
        args: [item, new_price, email] //An argument which can be accessed in the python file using sys.argv[1]
    };
    
    
    PythonShell.run('emailer.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected
          //during execution of script.
        //   console.log('price: ', result.toString());  
        //   price = result.toString()   
        console.log('success') 

          
    });

    }



async function updatePrice(user) {
    const database = await getDatabase();
    // console.log(database)

    // returns all of the items in the collection associated with the user
    const items = await database.collection(collectionName).find({ $and: [{username: {$eq: user}}, {password:  {$exists: false}}]}).toArray();
    console.log(items)
    // loop through all of the items and run the search function on it. 
    for (let i = 0; i < items.length; i++){
        const old_price = items[i]['prices']
        // const new_price = searchForPrice(items[i]['name'])
        const new_price = 0;
        if (new_price < old_price){
            // sendEmail(items[i], new_price, items[i]['email'])
            await sendEmail(items[i]['name'], new_price, "lees82880@gmail.com")
            console.log("lowered the price!")
        }
        console.log("didn't lower the price")

    }

}

// interval = 1000 * 60 * 60 * 24

module.exports = {
    updatePrice
}
