import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import {Button} from './Button';
import './FormSignup.css';
import get_values from './get_values';
import $ from 'jquery';

const url = 'http://localhost:3001/signup'

function FormSignup() {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

  return (
    <div>
      <div className="form-content-right">
        <form className="form">
          <h1>Sign Up Here!</h1>
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
            Email
            </label>
            <input type="email" 
              className="form-input"
              placeholder="Enter your email"
              id = "emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

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
          <Button className='form-input-btn' type="button" onClick={() => get_values(url, username, email, password)} buttonSize='btn--medium' buttonColor='green'>
            Sign Up 
          </Button>
          <span className="form-input-login">
             Already have an account? Login <Link to='/sign-in'>
               here
             </Link>
             </span>
        </form>
      </div>
    </div>
  )
}

export default FormSignup
