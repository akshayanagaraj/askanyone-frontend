import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import Login from './views/Login'
import Home from './views/Home/Index'




import './App.css';

const App = () => {
  let user_id = useSelector((state) => state.user.sign_in.user_id)
  
  console.log('user_id',localStorage.getItem('usr_id'))
  return (
    <div className="App">
      {
        ((localStorage.getItem('usr_name')!== '') && (localStorage.getItem('usr_id') > 0) || (user_id > 0))?
        <Home/>
        :
        <Login/>
      }
      
    </div>
  );
}

export default connect()(App);
