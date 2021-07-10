const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

	const {existeOuErro,naoExisteOuErro,compareValores} = app.config.msgs
	const limite = 20

	const gerarHash = (senha) => {
		const salt = bcrypt.genSaltSync(10)

		return bcrypt.hashSync(senha,salt)
	}

	const salvar = async (req,res) => {

		const usuario = {...req.body}

		if(req.user && req.user.id) usuario.id = req.user.id
			

		try{
			existeOuErro(usuario.nome,'Digite seu nome !')
			existeOuErro(usuario.usuario,'Digite um nome de usuário !')
			existeOuErro(usuario.email,'Digite um email válido !')
			existeOuErro(usuario.senha,'Digite uma senha válida !')

			if(!usuario.id){
				const usuarioDb = await app.db('usuarios').where({email:usuario.email}).first()
				naoExisteOuErro(usuarioDb,'Este usuário já está cadastrado !')							
			}
		}
		catch(msg){
			return res.status(400).send(msg)
		}

		usuario.senha = gerarHash(usuario.senha)

		if(usuario.id){
			app.db('usuarios')
				.update(usuario)
				.where({id:usuario.id})
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
		else{
			app.db('usuarios')
				.insert(usuario)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send())
		}

	}

	const pegarUsuarioId = (req,res) => {
		if(!req.params.id) return


		app.db('usuarios')
			.select('id','nome','usuario','email','online')
			.where({id:req.params.id})
			.first()
			.then(usuario => res.json(usuario))
			.catch(err => res.status(500).send(err))
	}

	const pegarTodosUsuarios = async (req,res) => {
		//console.log(req)
		const pagina = req.query.pagina || 1
		const usuarios = await app.db('usuarios').count('id').first()
		const quantidade = parseInt(usuarios.count)

		app.db('usuarios')
			.select('id','nome','usuario','email','online')
			.limit(limite).offset(pagina * limite - limite)
			.then(users => res.json({data:users,limite,quantidade}))
			.catch(err => res.status(500).send(err))
	}

	const removerTotal = async (req,res) => {
		//DELETE PRIMEIROS TODAS AS POSTAGENS DESSE USUARIO
			
		if(!req.user) return 

											
		try {
			const usuario = await app.db('usuarios')
										.where({id:req.user.id})
										.first()
			existeOuErro(usuario,'Este usuário que você está tentando remover, já foi removido !')

		}

		catch(msg){
			return res.status(400).send(msg)
		}	

		
		app.db('posts')
				.where({usuarioId:req.user.id})
				.del()
				.then(rowDel => {
					app.db('usuarios')
						.where({id:req.user.id})
						.del()
						.then(_ => res.status(204).send('Você acabou de deletar sua cnta !'))
						.catch(err => res.status(500).send(err))
						})
				.catch(err => res.status(500).send(err))
								
	}
	

	return {salvar,pegarUsuarioId,removerTotal,pegarTodosUsuarios}
}