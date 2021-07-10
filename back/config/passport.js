const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const {ExtractJwt,Strategy} = passportJwt

module.exports = app => {

	const params = {
		secretOrKey:authSecret,
		jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
	}

	const strategy = new Strategy(params, (payload,done) => {
		app.db('usuarios')
			.where({id:payload.id})
			.first()
			.then(usuario => usuario ? done(null,{...payload}) : done(null,false))
			.catch(err => done(err,false))
	})

	passport.use(strategy)

	return {
		authenticate: () => passport.authenticate('jwt',{session:false})
	}
}