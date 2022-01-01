import React, {useState, useEffect} from 'react'
import './Wish.css'
import { nanoid } from "nanoid";
import Wish_item from './wishlist-item'
import Form from './Form'
import ReactDOM from 'react-dom';
import {Redirect} from "react-router-dom"
import FilterButton from './FilterButton'
import HeroSection from '../HeroSection'
import {homeObjOne} from './Data'
import { scryRenderedComponentsWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';

const url = 'http://localhost:3001'
const priceUrl = 'http://localhost:3001/prices'
const postUrl = 'http://localhost:3001/postWish'

// const interval = 1000 * 60 * 60
const interval = 1

//check prices
// checkprices dummy request
const checkprices = async (url) =>
{
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
    mode: 'cors',
    headers:{
      'Content-Type': 'application/json'
    }

  })

}
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
  // fetching prices
  const getPrices = async (url, body) =>
  {
    const res = await fetch(url, {
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

    const data = await res.json()
    
    // console.log(data)

    return data
  }
  // posting wishes
  const postWishes = async (url, body) =>
  {
    const price = await getPrices(priceUrl, body)
    body['prices'] = await price
    // console.log(body)
    const res = await fetch(url, {
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
  // deleting wishes
  const deleteWishes = async (url, body) =>
  {
    const res = await fetch(url, {
      credentials: 'include',
      method: 'DELETE',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  }

  const DATA = [
    getWishes(url)
  ];

function Home() {
  const [wishes, setwishes] = useState(DATA);
  // console.log(wishes)

  useEffect(() => {
    const getthewishes = async () => {
        const task = await getWishes(url)
        console.log(Object.entries(task).map((e) => ( { [e[0]]: e[1] } )))
        setwishes(Object.keys(task).map(key => {
          return task[key];
      }))
    }
    getthewishes()
    }, [])

  function deleteTask(_id) {
    const remainingwishes = wishes.filter(task => _id !== task.id);
    setwishes(remainingwishes);
    const ids = {"id": _id}
    deleteWishes(url, ids)
  }
  setInterval(checkprices, interval)
  
  function addTask(name) {

    const newItem = {id: "todo- " + nanoid(), name: name }
    // console.log(newItem)

    setwishes([...wishes, newItem]);
    postWishes(postUrl, newItem);

  }

  console.log(wishes)
  const taskList = wishes.map(task => (
    
    <Wish_item 
    id={task.id}
     name={task.name} 
    key={task.id}
    prices = {task.prices}
     deleteTask={deleteTask}
    />
  ));
  



  
    return (
        <div className="wishlist stack-large">
          <h1>Wish List</h1>
          <Form addTask={addTask}/>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {taskList}
            
          </ul>
        </div>
      );
    }

export default Home
