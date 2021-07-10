const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

	const {existeOuErro,naoExisteOuErro} = app.config.msgs

	const singin = async (req,res) => {

		if(!req.body.senha || !req.body.usuario) return

		const usuario = {...req.body}

		const usuarioDb = await app.db('usuarios').where({usuario:usuario.usuario}).first()

		try{		
			existeOuErro(usuarioDb,'Usuário não encontrado')			
		}

		catch(msg){
			return res.status(400).send(msg)
		}

		const isMatch = bcrypt.compareSync(usuario.senha,usuarioDb.senha)

		if(!isMatch) return res.status(400).send('Senha inválida !')

		const now = Math.floor(Date.now() / 1000)

		const payload = {
			id:usuarioDb.id,
			nome:usuarioDb.nome,
			usuario:usuarioDb.usuario,
			email:usuarioDb.email,
			iat:now,
			exp:now+(60*60*24*5)
		}	

		res.json({
			...payload,
			token: jwt.encode(payload,authSecret)
		})
		
	}

	const validarToken = (req,res) => {

		const usuarioData = req.body || null
			
		try{
			if(usuarioData){
				const token = jwt.decode(usuarioData.token,authSecret)

				if(new Date(token.exp * 1000) > new Date()){
					return res.send(true)
				}
			}
		}

		catch(e){

		}

		res.send(false)
	}

	return {singin,validarToken}
}