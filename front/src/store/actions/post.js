import {PEGAR_POSTS} from './actionsTypes'
import {baseUrl} from '../../config/constantes'
import axios from 'axios'


export const pegarPosts = dados => {
	return {
		type:PEGAR_POSTS,
		payload:dados
	}
	
}


