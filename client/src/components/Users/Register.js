import React, { useState } from "react";
import logo from '../assets/logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";

async function RegisterUser(credentials) {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json()) 
}

export default function Register({ setToken }) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await RegisterUser({
            username,
            email,
            password
        });

        setToken(token); 
    }

  return (
    <div className="login-wrapper">
      <div>
        <img src={logo} alt="logo" className="logo"/>
      </div>
      
    <h3 className="titulo">Create your account</h3>
      <form onSubmit={handleSubmit}>
      <fieldset className="register">
          <label>
            <p>Username</p>
            <input name="username" type="text" onChange={e => setUsername(e.target.value)} />
          </label>
        </fieldset>
        <fieldset className="register">
          <label>
            <p>Email</p>
            <input name="email" type="email" onChange={e => setEmail(e.target.value)} />
          </label>
        </fieldset>
        <fieldset >
          <label>
            <p>Password</p>
            <input name="password" type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </fieldset>
        <button type="submit" class="btn btn-primary" >
          Register
        </button>
      </form>

      <a href="/login" className="enlace"><p>Or login</p></a>

      

    </div>
  );
}