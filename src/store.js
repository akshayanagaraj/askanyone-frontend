import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import reducer from './reducers/index'


const history = createHashHistory()
const middleware = routerMiddleware(history)
export const store = createStore(
    reducer,
    applyMiddleware(thunk, logger, middleware)
)