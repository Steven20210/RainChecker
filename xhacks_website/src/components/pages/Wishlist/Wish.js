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

    console.log(data)

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
    
    console.log(data)

    return data
  }
  // posting wishes
  const postWishes = async (url, body) =>
  {
    // const price = await getPrices(priceUrl, body)
    // body['prices'] = await price

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
  const [tasks, setTasks] = useState(DATA);
  console.log(tasks)

  useEffect(() => {
    const getthewishes = async () => {
        const task = await getWishes(url)
        console.log(Object.entries(task).map((e) => ( { [e[0]]: e[1] } )))
        setTasks(Object.keys(task).map(key => {
          return task[key];
      }))
    }
    getthewishes()
    }, [])

  function deleteTask(_id) {
    const remainingTasks = tasks.filter(task => _id !== task.id);
    setTasks(remainingTasks);
    const ids = {"id": _id}
    deleteWishes(url, ids)
  }

  
  function addTask(name) {

    const newItem = {id: "todo- " + nanoid(), name: name, completed: false }
    console.log(newItem)
    setTasks([...tasks, newItem]);
    postWishes(postUrl, newItem);

  }


  const taskList = tasks.map(task => (
    <Wish_item 
    id={task.id}
     name={task.name} 
    completed={task.completed} 
    key={task.id}
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
