import {createStore,combineReducers,compose,applyMiddleware} from 'redux'

import postsReducer from './reducers/post'

import authReducer from './reducers/auth'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	posts:postsReducer,
	auth:authReducer
})

const storeConfig = () => {
	return createStore(reducers,compose(applyMiddleware(thunk)))
}

export default storeConfig