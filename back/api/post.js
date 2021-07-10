module.exports = app => {

	const {existeOuErro,naoExisteOuErro} = app.config.msgs
	const limite = 10

	const salvar = (req,res) => {

		if(!req.user) return 

		const post = {...req.body}
		post.usuarioId = req.user.id

		if(req.params.id) post.id = req.params.id

		try{
			existeOuErro(post.post,'Escolha uma publicação !')
			existeOuErro(post.usuarioId,'Usuário indefinido !')
		}

		catch(msg){
			return res.status(400).send(msg)
		}

		if(post.id){
			app.db('posts')
				.update(post)
				.where({id:post.id,usuarioId:req.user.id})
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}

		else{
			app.db('posts')
				.insert(post)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}	
	}

	const pegarPostId = (req,res) => {

		if(!req.params.id) return 

		app.db({p:'posts',u:'usuarios'})
			.select('p.id','p.titulo','p.descricao','p.post',{idUsuario:'u.id',autor:'u.usuario'})
			.where('p.id',req.params.id)
			.whereRaw('?? = ??', ['p.usuarioId','u.id'])
			.first()// SE NAO COLOCAR O FIRST, VIRA UMA ARRAY, SE NAO SO VIRA UM OBJETO
			.then(post => res.json(post))
			.catch(err => res.status(500).send(err))

	}

	const pegarTodosPosts = async (req,res) => {
		const pagina = req.query.pagina || 1
		const posts = await app.db('posts').count('id').first()
		const quantidade = parseInt(posts.count)

		if(quantidade > 0){
			app.db({p:'posts',u:'usuarios'})
			.select('p.id','p.titulo','p.descricao','p.post',{idUsuario:'u.id',autor:'u.usuario'})
			.whereRaw('?? = ??',['p.usuarioId','u.id'])
			.limit(limite).offset(pagina * limite - limite)
			.orderBy('p.id','desc')
			.then(posts => res.json({data:posts,quantidade,limite}))
			.catch(err => res.status(500).send(err))
		}
	}

	const removerPost = (req,res) => {
		if(!req.params.id) return

		app.db('posts')
			.where({id:req.params.id,usuarioId:req.user.id})
			.del()
			.then(_ => res.status(204).send())
			.catch(err => res.status(500).send(err))
	}



	return {salvar,pegarPostId,removerPost,pegarTodosPosts}
}