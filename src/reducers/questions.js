const questionReducerDefaultState = {
    questions:[],
    api:{get_questions:false}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = questionReducerDefaultState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'NOTIFY_GET_QUESTIONS':
            return {
                ...state,
                api:{
                    ...state.api,
                    get_questions:action.payload.load,
                },
                questions: [],
            }
        case 'GET_QUESTIONS_SUCCESS':
            return {
                ...state,
                questions: action.payload.questions,
                api:{
                    ...state.api,
                    get_questions:action.payload.load
                }
            }
        case 'GET_QUESTIONS_FAIL':
            return {
                ...state,
                api:{
                    ...state.api,
                    get_questions:action.payload.load,
                },
                questions: [],
            }
        default:
            return state;
    
        }
    }