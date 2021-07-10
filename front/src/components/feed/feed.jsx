import React,{useState,useEffect,useRef} from 'react'
import '../container.css'
import './feed.css'
import {ToastContainer} from 'react-toastify'
import {connect} from 'react-redux'
import {pegarPosts} from '../../store/actions/post'
import axios from 'axios'
import {baseUrl,keyStorage} from '../../config/constantes'
import {mensagem} from '../../config/msgs'
import {loggout} from '../../store/actions/auth'

const initialPost = {
	post:'',
	titulo:'',
	descricao:''
}

export const feed = props => {

	const [NovaPostagem,setNovaPostagem] = useState({...initialPost})
	const [page,setPage] = useState(1)
	const [limite,setLimite] = useState(0)
	const [quantidade,setQuantidade] = useState(0)
	const [carregado,setCarregado] = useState(false)
	const isMontado = useRef(null)
	
	useEffect(() => {

		if(isMontado) getPost()

	},[page])

	useEffect(() => {

		isMontado.current = true
		
		return () => {
			isMontado.current = false
		} 

	},[])

	

	const paginacao = () => {
		let calcularpaginas = Math.ceil(quantidade/limite)
		let arr = []

		for(let i = 1;i<=calcularpaginas;i++){
			arr[i] = i
		}

		return arr.map(numero => <button key={numero} onClick={() => setPage(numero)}>{numero}</button>)

	}

	const getPost = () => {
		axios.get(baseUrl+`/post?pagina=${page}`)
			.then(res => {
				if(isMontado.current){
					props.onPegarPosts(res.data.data)
					setQuantidade(res.data.quantidade)
					setLimite(res.data.limite)
					setCarregado(true)
				}
				
				
			})

			.catch(err => props.onLoggout())
	}	


	
	const salvar = (e) => {
		e.preventDefault()
		axios.post(baseUrl+`/post`,NovaPostagem)
			.then(() => {
				mensagem('Postagem inserida com sucesso !','success')
				getPost()
				setNovaPostagem({...initialPost})
			})
			.catch(err => console.log)	

		
	}

	const publicacoes = () => {
		
		return props.posts.posts.map(post => {
			return (
				<div key={post.id} className="publicacao-single">
					<span>{post.autor}</span>
					<p>{post.post}</p>
				</div>
				)
		})
	}
	

	return (
		<div className="container">
			<div className="feed">
				<ToastContainer/>
				<h1>No que você está pensando ?</h1>

				<form>
					<textarea value={NovaPostagem.post} onChange={(e) => setNovaPostagem({...NovaPostagem,post:e.target.value})} placeholder="Faça uma publicação ..."></textarea>
					<button onClick={salvar}>Postar</button>
				</form>

				<h3>Veja os que as pessoas estão comentando ...</h3>

				<div className="publicacoes">
					{carregado && publicacoes()}
				</div>

				<div className="paginacao">
					{carregado && paginacao()}
				</div>

			</div>
		</div>
		)
}

const mapStateToProps = ({auth,posts}) => {
	return {
		auth,
		posts
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPegarPosts: dados => dispatch(pegarPosts(dados)),
		onLoggout: () => dispatch(loggout())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(feed)
