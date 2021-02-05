import React, { useState, useEffect } from 'react';
import Form from './Form.js'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  const getUserName = () => {
    return fetch('http://localhost:9999/userinfo', {credentials:'include'})
    .then(r => {
      if(r.ok) {
        return r.json();
      } else {
        setLoggedIn(false);
        setUserName(undefined);
        return { success: false };
      }
    }).then(r => {
      if(r.success !== false) {
        setLoggedIn(true);
        setUserName(r.userName);
      }
    });
  }

  useEffect(() => {
    getUserName();
  }, []);


  const signupHandler = (username, password) => {
    loginOrSignup('http://localhost:9999/signup', username, password);
  };
  const loginHandler = (username, password) => {
    loginOrSignup('http://localhost:9999/login', username, password);
  };

 


  const loginOrSignup = (url, username, password) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ userName: username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((r) => {
        if(r.ok) {
          return { success: true };
        } else {
          return r.json()
        }
      })
      .then((r) => {
        if(r.success === true) {
          return getUserName();
        } else {
          setError(r.err);
        }
      });
  }
  const AddInfoHandler = (userName, emailId, interest, userId )=>{
   
    GetAllInfo('http://localhost:9999/info',userName, emailId, interest, userId);
    
  }
  const GetAllInfo=(url,userName, emailId, interest, userId)=>{
    fetch(url, {
      method: "POST",
      body: JSON.stringify({userName, emailId, interest, userId }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then((r) => {
      
        return r.json()
      
    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <Form signupHandler={signupHandler}
      loginHandler={loginHandler}
      AddInfoHandler={AddInfoHandler}
      error={error}/>
      </header>
    </div>
  );
}

export default App;
