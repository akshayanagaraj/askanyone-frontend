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
            payload:{}
        })
        axios
          .get(API_URL+'/get_questions?per_page=100&page=1&user_id='+user_id+'&status=open&key='+key, axiosConfig)
          .then((response) => {
            console.log('questions',response)
            dispatch({
              type: "GET_QUESTIONS_SUCCESS",
              payload: {  },
            });
            
            dispatch(push("/"));
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: "APP_LOGOUT",
              payload: { error_message: null },
            });
            
            
          });
      };
}

export const cleanQuestions = () => {
    return {
        type: 'CLEAN_QUESTIONS',
        payload:{}
    }
}