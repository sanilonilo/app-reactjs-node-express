import React,{useState} from 'react'
import './cadastroELogin.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {singin,signup} from '../../store/actions/auth'
import {baseUrl} from '../../config/constantes'
import {ToastContainer} from 'react-toastify'

const initialState = {
	nome:'',
	senha:'',
	email:'',
	usuario:''
}

const cadastroELogin = props => {
	
	const [usuario,setUsuario] = useState({...initialState})
	const [modo,setModo] = useState(false)

	const clickLogin = (e) => {
		e.preventDefault()
		props.onLogin(usuario)
	}

	const clickRegistrar = (e) => {
		e.preventDefault()
		props.onRegistrar(usuario)
		setModo(false)
	}

	return(
		<div className="login">
			<ToastContainer/>
			<form>
				{modo && <input type="text" onChange={(e) => setUsuario({...usuario,nome:e.target.value})} placeholder="Nome"/>}
				<input type="text" onChange={(e) => setUsuario({...usuario,usuario:e.target.value})} placeholder="Usuário"/>
				{modo && <input type="text" onChange={(e) => setUsuario({...usuario,email:e.target.value})} placeholder="Email"/>}
				<input type="text" onChange={(e) => setUsuario({...usuario,senha:e.target.value})} placeholder="Senha"/>
				<button onClick={modo ? clickRegistrar : clickLogin }>{!modo ? 'Entrar' : 'Registrar'}</button>
			</form>
			<span onClick={() => setModo(!modo)}>{!modo ? 'Não tem conta ? Registre-se !' : 'Já possui uma conta ? Faça login'}</span>
		</div>
		)
}

const mapDispatchToProps = dispatch => {
	return {
		onLogin: usuario => dispatch(singin(usuario)),
		onRegistrar: usuario => dispatch(signup(usuario))
	}
}

export default connect(null,mapDispatchToProps)(cadastroELogin)