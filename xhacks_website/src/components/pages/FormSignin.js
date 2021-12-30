import React from 'react'
import {useState} from 'react'
import {Button} from './Button';
import './FormSignin.css';
import get_values from './get_values';
import get_signin from './get_signin';
const url = 'http://localhost:3001/signin'

function FormSignin() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

  return (
    <div>
      <div className="form-content-right">
        <form className="form">
          <h1>Sign In Here!</h1>
          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" 
              className="form-input"
              placeholder="Enter your username"
              id = "usernameInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="form-inputs">
            <label className="form-label">
            Password
            </label>
            <input type="password" 
              className="form-input"
              placeholder="Enter your password"
              id = "passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <Button className='form-input-btn' type="button" onClick={() => get_signin(url, username, password)} buttonSize='btn--medium' buttonColor='green'>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default FormSignin