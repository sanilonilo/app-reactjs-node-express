import {PEGAR_POSTS} from '../actions/actionsTypes'

const initialState = {
	posts:[]
}

const reducer = (state=initialState,action) => {
	switch(action.type){

		case PEGAR_POSTS:
			return {
				...state,
				posts:action.payload
			}


		default: return state			
	}
}

export default reducer