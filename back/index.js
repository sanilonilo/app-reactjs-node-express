const express = require('express')
const app = express()
const db = require('./config/db.js')
const consign = require('consign')

app.db = db

consign()
	.include('./config/passport.js')
	.then('./config/msgs.js')
	.then('./config/middlewares.js')
	.then('./api')
	.then('./config/routes.js')
	.into(app)
	

app.listen(3300,() => console.log('Aplicação rodando ...'))