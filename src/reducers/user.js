const userReducerDefaultState = {
    sign_in: {
        username:'',
        password:'',
        user_id:0,
        error_msg:''

    },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = userReducerDefaultState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                sign_in:{
                    ...state.sign_in,
                    username: action.payload.username,
                    password: action.payload.password,
                    user_id: action.payload.user_id,

                }
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                sign_in:{
                    ...state.sign_in,
                    error_msg:action.payload.error_msg
                }
            };
        case "LOGOUT":
            return{
                ...state,
                sign_in: userReducerDefaultState.sign_in
            }
        default:
            return state;
    
        }
    }