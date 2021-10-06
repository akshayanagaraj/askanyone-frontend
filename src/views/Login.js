import React, {useState} from 'react'
import { connect, useSelector } from 'react-redux'

import logo from '../assets/images/logo.png'
import { login } from '../actions/user'

function Login(props) {
    const error_msg = useSelector((state) => state.user.sign_in.error_msg)
    let [username, updateUsername ]= useState('') 
    let [password, updatePassword] = useState('')

    let loginHandler = () => {
        props.dispatch(login(username,password))

    }
    
    return (
        <div className="login-page">
            <div className="row">
                
                    <img src={logo} alt="logo" className="logo" />
                    <span className="title">Ask Anyone</span>
                
                
            </div>
            <div className="row">
                <div className="login-card center">
                    <div className="center" style={{width:"50%"}}>
                        <div style={{textAlign:'center', fontSize:"1.5rem"}}>Login  |  Signup</div><br/>
                        <input id="username" type="text" placeholder = "Username" value={username} onChange={(e) => {updateUsername(e.target.value)}}></input><br/><br/>
                        <input id="password" type="password" placeholder = "Password" value={password} onChange={(e) => {updatePassword(e.target.value)}}></input><br/><br/>
                        
                        { error_msg!== '' && <div style={{color:'red',fontSize:'0.75rem'}}>{error_msg}</div>}  <br/>
                        <button className="primary-button" onClick={loginHandler}>Submit</button>
                    </div>
                </div>
            </div>
            
        
        </div>
    )
}

export default connect()(Login)
