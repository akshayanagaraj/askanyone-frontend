import { combineReducers } from "redux";
import userReducer from "./user";
import questionsReducer from "./questions";

const rootReducer = combineReducers({
	user: userReducer,
	questions: questionsReducer,
})

const initialState = rootReducer({}, {});
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  if (action.type === "APP_LOGOUT") {
    state = initialState;
  }
  return rootReducer(state, action);
};
