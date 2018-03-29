const express = require ('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
var session = require('express-session')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: "express secret key",
  resave: false,
  saveUninitialized: true
}))

//index
var routeIndex = require('./routes/index.js')
app.use('/', routeIndex)

//user
var routeUser = require('./routes/user.js')
app.use('/user', routeUser)

//test views



app.listen(3800, () => console.log('express running'))
