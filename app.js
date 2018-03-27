const express = require ('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

//index
var routeIndex = require('./routes/index.js')
app.use('/', routeIndex)

//user
var routeUser = require('./routes/user.js')
app.use('/home', routeUser)

app.listen(3800, () => console.log('express running'))
