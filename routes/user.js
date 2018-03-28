var express = require('express')
var router = express.Router()
const cTeam = require('../controllers/ControllerTeam.js');

router.get('/home', function(req, res, next){
  if (req.session.user) {
    next()
  }else{
    res.redirect('/')
  }
})

router.get('/home', (req, res) =>
  res.render('home.ejs')
)

router.get('/profile', (req, res) =>
  res.send("profile page")
)

router.get('/createTeam', (req, res) =>
  res.render('create_team')
)

router.post('/createTeam', function(req, res){
  let teamProperties = {
    nama: req.body.teamName,
    id_ketua: req.session.user.id,
  }

  cTeam.add(teamProperties)
  .then(function(newTeam){
    res.send(newTeam)
  })
})



module.exports = router
