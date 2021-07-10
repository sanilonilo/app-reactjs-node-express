module.exports = app => {
	
	app.post('/singin',app.api.auth.singin)
	app.post('/signup',app.api.usuario.salvar)
	app.post('/validar',app.api.auth.validarToken)

	app.route('/usuario/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.usuario.pegarUsuarioId)
		
		

	app.route('/usuario')
		.all(app.config.passport.authenticate())
		.get(app.api.usuario.pegarTodosUsuarios)
		.put(app.api.usuario.salvar)

	app.route('/conta_delete')
		.all(app.config.passport.authenticate())
		.delete(app.api.usuario.removerTotal)	

	app.route('/post/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.post.pegarPostId)
		.put(app.api.post.salvar)
		.delete(app.api.post.removerPost)

	app.route('/post')
		.all(app.config.passport.authenticate())
		.get(app.api.post.pegarTodosPosts)
		.post(app.api.post.salvar)		
}