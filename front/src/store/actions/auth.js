import axios from 'axios'
import {baseUrl} from '../../config/constantes'
import {TOKEN_VALIDADO,USUARIO_VALIDADO} from '../actions/actionsTypes'
import {mensagem} from '../../config/msgs'

export const singin = (dados) => {
	return submit(dados,baseUrl+'/singin',false)
}

export const signup = (dados) => {
	return submit(dados,baseUrl+'/signup',true)
}

export const loggout = () => {
	return {type:TOKEN_VALIDADO,payload:false}
} 

export const update = (dados) => {
	return dispatch => {
		if(dados){
			axios.put(baseUrl+'/usuario',dados)
				.then(res => {
					dispatch({type:TOKEN_VALIDADO,payload:false})
				})
				.catch(err => mensagem(err,'error'))
		}
		else{
			return
		}
	}
}

export const deletarConta = () => {
	return dispatch => {
		axios.delete(baseUrl+'/conta_delete')
			.then(() => {
				dispatch({type:TOKEN_VALIDADO,payload:false})
			})
			.catch(err => mensagem(err,'error'))
	}
}

export const validarToken = (usuario) => {
	return dispatch => {
		if(usuario){
			axios.post(baseUrl+'/validar',usuario)
				.then(res => {
					dispatch({type:TOKEN_VALIDADO,payload:true})
				})
				.catch(e => dispatch({type:TOKEN_VALIDADO,payload:false}))
		}
		else{
			dispatch({type:TOKEN_VALIDADO,payload:false})
		}
	}
}

const submit = (dados,url,novaConta=false) => {
	return dispatch => {
		axios.post(url,dados)
			.then(res => {

				if(!novaConta) dispatch({type:USUARIO_VALIDADO,payload:res.data})
				
				else mensagem('Usuário cadastrado com sucesso .','success')
			})
			.catch(err => mensagem(err,'error'))
	}
}