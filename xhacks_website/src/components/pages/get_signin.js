import React from 'react'

async function get_signin (url, username, password)  
{
    
    const body = {
        "username": username,
        "password": password
    }
    await fetch(url, {
      credentials: 'include',
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


export default get_signin
