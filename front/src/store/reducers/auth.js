import {keyStorage} from '../../config/constantes'
import {TOKEN_VALIDADO,USUARIO_VALIDADO} from '../actions/actionsTypes'

const estadoInicial = {
	usuario: JSON.parse(localStorage.getItem(keyStorage)),
	tokenValido:false
}

const reducer = (state=estadoInicial,action) => {
	switch(action.type){

		case TOKEN_VALIDADO:
			if(action.payload){
				return {...state,tokenValido:true}
			}

			else{
				localStorage.removeItem(keyStorage)
				return {...state,usuario:null,tokenValido:false}
			}

		case USUARIO_VALIDADO:
			localStorage.setItem(keyStorage,JSON.stringify(action.payload))
			return {...state,usuario:action.payload,tokenValido:true}


		default: return state		
	}
}

export default reducer