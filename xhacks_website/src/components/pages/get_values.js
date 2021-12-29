

async function get_values (url, username, email, password) 
  {
    
    const body = {
        "username": username,
        "email": email,
        "password": password
    }
    console.log("hello")
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      success: function(data){
        console.log(data)
     }
    })
  }

export default get_values