import React, {useState, componentDidMount} from 'react'
import './Wish.css'
import { nanoid } from "nanoid";
import Wish_item from './wishlist-item'
import Form from './Form'
import FilterButton from './FilterButton'
import HeroSection from '../HeroSection'
import {homeObjOne} from './Data'
import { scryRenderedComponentsWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';

const url = 'http://localhost:3001'
function Home() {

  function deleteTask(_id) {
    const remainingTasks = tasks.filter(task => _id !== task.id);
    setTasks(remainingTasks);
    const ids = {"id": _id}
    deleteWishes(url, ids)
  }

  
  function addTask(name) {
    // const res = await fetch(`http://localhost:5000/list`)
    // const newItem = res.json()

    const newItem = {id: "todo- " + nanoid(), name: name, completed: false }

    setTasks([...tasks, newItem]);
    postWishes(url, newItem);
    // componentDidMount() ;{
    //   postWishes(url, newItem)
    // }
  }

  const DATA = [
    getWishes(url)
  ];
  const [tasks, setTasks] = useState(DATA);


  const taskList = tasks.map(task => (
    <Wish_item 
    id={task.id}
     name={task.name} 
    completed={task.completed} 
    key={task.id}
     deleteTask={deleteTask}
    />
  ));
  
  // fetching Wishes
  const getWishes = async (url) =>
  {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }

    })
    const data = await res.json()
    return data
  }

  const postWishes = async (url, body) =>
  {
    const res = await fetch(url, {
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

    // posttodb()
  }

  const deleteWishes = async (url, body) =>
  {
    const res = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  }

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
