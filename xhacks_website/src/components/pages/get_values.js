

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
    // posttodb()
//   }
// function get_values(){
//     let username = document.querySelector('#usernameInput').value
//     let email = document.querySelector('#emailInput').value
//     let password = document.querySelector('#passwordInput').value

//     $.ajax({
//         url: "/sign-up",
//         data: {
//             username: username,
//             email: email,
//             password: password
//         },
//         dataType: "JSON",
//         type: "POST",
//         }
//     );
// }

export default get_values