var express = require('express')
var router = express.Router()

const cUser = require('../controllers/ControllerUser.js');
const model = require('../models');
const cTeam = require('../controllers/ControllerTeam.js');

router.get('/home', function(req, res, next){
  if (req.session.user) {
    next()
  }else{
    res.redirect('/')
  }
})

router.get('/home', (req, res) =>
  res.render('home.ejs', {nickname: req.session.user.nickname})
)

router.get('/profile', (req, res) =>
  res.send("profile page")
)

router.get('/user/my_team',(req, res) =>
    res.send("my team page")
)

router.get('/create_team', (req, res) =>
  res.render('create_team')
)

router.post('/create_team', function(req, res){
  let teamProperties = {
    nama: req.body.teamName,
    id_ketua: req.session.user.id,
  }

  cTeam.add(teamProperties)
  .then(function(newTeam){
    res.send(newTeam)
  })
})

router.get('/teams', (req, res) =>
  model.User.findOne({
    where: {
      id: 7
    },
    include: [
      {
        model: model.UserTeam,
      }
    ]
  })
  .then(user => {
    res.render('my_team', {user});
  })
)


module.exports = router
