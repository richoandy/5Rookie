const express = require ('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  res.send('5Rookie')
})

app.listen(3800, () => console.log('express running'))
