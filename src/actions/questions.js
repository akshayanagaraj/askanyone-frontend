import axios from "axios";

import { push } from "react-router-redux";
import { API_URL } from "../config";
let axiosConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const getQuestions = (user_id, key) => {
    console.log('get questions', user_id, key)
    return (dispatch) => {
        dispatch({
            type:'NOTIFY_GET_QUESTIONS',
            payload:{load:true}
        })
        axios
          .get(API_URL+'/get_questions?per_page=100&page=1&user_id='+user_id+'&status=open&key='+key, axiosConfig)
          .then((response) => {
            console.log('questions',response.data.data)
            dispatch({
              type: "GET_QUESTIONS_SUCCESS",
              payload: { load:false, questions: response.data.data },
            });
            
            dispatch(push("/"));
          })
          .catch((error) => {
            console.log(error);
            if (error.response !== undefined && error.response.data.hasOwnProperty('status') && (error.response.data.status === 'expired' || error.response.data.status === 'session timeout' || error.response.data.status === 'invalid' || error.response.data.status === 'no header')) {
                localStorage.setItem('usr_name','')
                localStorage.setItem('usr_id',0)
                dispatch({
                    type: 'APP_LOGOUT',
                    payload: { error_msg: (error.response.data.status === 'expired' || error.response.data.status === 'session timeout') ? 'Your session expired' : error.response.data.status === 'invalid' ? 'Invalid token' : 'You are unauthorized to access this application' }
                })
                
            } else {
                dispatch({
                    type: 'GET_QUESTIONS_FAIL',
                    payload: { load:false }
                })
            }
            
            
          });
      };
}

export const cleanQuestions = () => {
    return {
        type: 'CLEAN_QUESTIONS',
        payload:{}
    }
}

export const createComment = (user_id, question_id, comment, tab_selected) => {
    return ((dispatch) => {
        axios
          .post(API_URL+'/create_comment?user_id='+user_id+'&question_id='+question_id+'&comment='+comment, axiosConfig)
          .then((response) => {
            console.log('comment created')
            dispatch(getQuestions(user_id, tab_selected));
            
            dispatch(push("/"));
          })
          .catch((error) => {
            console.log(error);
            if (error.response !== undefined && error.response.data.hasOwnProperty('status') && (error.response.data.status === 'expired' || error.response.data.status === 'session timeout' || error.response.data.status === 'invalid' || error.response.data.status === 'no header')) {
                localStorage.setItem('usr_name','')
                localStorage.setItem('usr_id',0)
                dispatch({
                    type: 'APP_LOGOUT',
                    payload: { error_msg: (error.response.data.status === 'expired' || error.response.data.status === 'session timeout') ? 'Your session expired' : error.response.data.status === 'invalid' ? 'Invalid token' : 'You are unauthorized to access this application' }
                })
                
            } else {
                dispatch({
                    type: 'GET_QUESTIONS_FAIL',
                    payload: { load:false }
                })
            }
            
            
          });
    })
}

export const createQuestion = (user_id, title, question, tab_selected) => {
    return ((dispatch) => {
        axios
          .post(API_URL+'/create_question?user_id='+user_id+'&question='+question+'&title='+title, axiosConfig)
          .then((response) => {
            console.log('question created')
            dispatch(getQuestions(user_id, tab_selected));
            
            dispatch(push("/"));
          })
          .catch((error) => {
            console.log(error);
            if (error.response !== undefined && error.response.data.hasOwnProperty('status') && (error.response.data.status === 'expired' || error.response.data.status === 'session timeout' || error.response.data.status === 'invalid' || error.response.data.status === 'no header')) {
                localStorage.setItem('usr_name','')
                localStorage.setItem('usr_id',0)
                dispatch({
                    type: 'APP_LOGOUT',
                    payload: { error_msg: (error.response.data.status === 'expired' || error.response.data.status === 'session timeout') ? 'Your session expired' : error.response.data.status === 'invalid' ? 'Invalid token' : 'You are unauthorized to access this application' }
                })
                
            } else {
                dispatch({
                    type: 'GET_QUESTIONS_FAIL',
                    payload: { load:false }
                })
            }
            
            
          });
    })
}