import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {update,deletarConta} from '../../store/actions/auth'
import '../container.css'
import './perfil.css'
import {ToastContainer} from 'react-toastify'


export const perfil = props => {

	const initialState = {
		id:props.auth.usuario.id,
		usuario:props.auth.usuario.usuario,
		senha:'',
		email:props.auth.usuario.email,
		nome:props.auth.usuario.nome
	} 
	const [user,setUser] = useState({...initialState})

	const salvar = (e) => {
		e.preventDefault()
		props.onSalvar(user)
		setUser({...initialState})
	}

	const deletar = () => {
		
		const confirmacao = confirm('Deseja excluir permanentimente sua conta e todas as suas postagens ?')

		if(confirmacao) props.onDeletarConta()

		else return	
	}

	return (
		<div className="container">
			<ToastContainer/>
			<div className="perfil">
				<h1>Seu perfil</h1>
				<form>
					<input value={user.nome} onChange={(e) => setUser({...user,nome:e.target.value})} type="text" placeholder="Nome"/>
					<input value={user.usuario}  onChange={(e) => setUser({...user,usuario:e.target.value})} type="text" placeholder="Usuário"/>
					<input value={user.email}  onChange={(e) => setUser({...user,email:e.target.value})} type="text" placeholder="Email"/>
					<input value={user.senha}  onChange={(e) => setUser({...user,senha:e.target.value})} type="text" placeholder="Senha"/>
					<button onClick={salvar}>Salvar</button>
					</form>
				<button onClick={deletar} className="deletar">Deletar conta</button>

			</div>
		</div>
		)
}

const mapStateToProps = ({auth}) => {
	return{
		auth
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onSalvar: usuario => dispatch(update(usuario)),
		onDeletarConta: () => dispatch(deletarConta())
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(perfil)