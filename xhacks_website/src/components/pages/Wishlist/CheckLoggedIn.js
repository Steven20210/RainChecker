import React, {useEffect, useState} from 'react'
import Home from './Wish'
import {Redirect} from "react-router-dom"
const url = 'http://localhost:3001'


  // fetching Wishes
  const getWishes = async (url) =>
  {
    const res = await fetch(url, {
        credentials: 'include',
      method: 'GET',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }

    })
    const data = await res.json()

    // console.log(data)

    return data
  }


const CheckLoggedIn = () => {
    const [cond, setCond] = useState('') // need to useState in the fucking async functions also https://stackoverflow.com/questions/54936559/using-async-await-in-react-component
    useEffect(() => {
    const getthewishes = async () => {
        const conds = await getWishes(url)
        setCond(conds)
    }
    getthewishes()
    }, [])

    console.log(cond)
    if ( cond.loggedIn == 'false'){
        console.log("did work")
        return (


    <Redirect to='/sign-up'/>
    )
        }
return (
    <Home/>
)


    
}
export default CheckLoggedIn
