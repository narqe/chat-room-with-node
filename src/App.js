import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {UserContext} from './UserContext';
import  Chat from './components/chat/Chat'
import  Home from './components/home/Home'
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/verifyuser', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    verifyUser()
  }, [])

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{user, setUser}}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/chat/:roomId/:roomName" component={Chat}></Route> 
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
