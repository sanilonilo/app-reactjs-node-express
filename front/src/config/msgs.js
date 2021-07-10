import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './msgs.css'

export const mensagem = (msg,status) => {

	if(status === 'error'){
		if(msg.response  && msg.response.data && msg.response.data.message) 
			return toast.error(`${msg.response.data.message}`)

		else if(msg.response && msg.response.data) return toast.error(`${msg.response.data}`)

		else return toast.error('Ocorreu um erro nesta operação .')
	}

	else{
		toast.success(msg)
	}
}
