import axios from "axios";

import { push } from "react-router-redux";
import { API_URL } from "../config";
let axiosConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const login = (username, password) => {
    console.log('in action', username, password)
    if (username === '' || password === ''){
        console.log('login fail')
        return (dispatch) => {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: {
                    error_msg: 'Invalid Login Credentials'}
            })
        }
    } 
    else{
        console.log('step 1')
        if ((username === 'akshaya' && password === "hello") || (username === 'arun' && password === "hello") || (username === 'akshaya' && password === "hello")){
            console.log('step 2')
            return(dispatch) => {
                
                console.log('step 3')
                axios.get(API_URL + '/get_user_id?username='+username,axiosConfig)
                .then((response) => {
                    console.log('LOGIN_SUCCESS',response.data.data[0])
                    localStorage.setItem('usr_name',username)
                    localStorage.setItem('usr_id',response.data.data[0].user_id)
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        payload: {
                            username: username,
                            password: password,
                            user_id: response.data.data[0].user_id
                        }
                    })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch({
                        type: 'LOGIN_FAIL',
                        payload:{}
                    })
                    
                    
                })
            }
        }
        else{
            console.log('login fail')
            return (dispatch) => {
                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: {
                        error_msg: 'Invalid Login Credentials'}
                })
            }
        }
    } 
}