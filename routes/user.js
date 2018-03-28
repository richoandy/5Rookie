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
  res.render("profile_page", {nickname: req.session.user.nickname, user: req.session.user})
)

router.get('/profile/edit', (req, res) =>
  res.render('profile_edit', {
    nickname: req.session.user.nickname,
    user: req.session.user,
    position:["Position 1", "Position 2", "Position 3", "Position 4","Position 5"],
    medal:["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine",],
    star:[0, 1, 2, 3, 4, 5, 6,]
  })
)

router.post('/profile/edit', (req, res) =>
  cUser.update({
    email: req.body.email,
    nickname: req.body.nickname,
    position: req.body.position,
    medal: req.body.medal,
    star: req.body.star,
    link_steam: req.body.link_steam
  }, req.session.user.id)
  .then(function(success){
    req.session.user = success
    res.redirect('/user/home')
  })

)

router.get('/create_team', (req, res) =>
  res.render('create_team', {nickname: req.session.user.nickname})
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
      id: req.session.user.id
    },
    include: [
      {
        model: model.UserTeam,
      }
    ]
  })

  .then(user => {
    res.render('my_team', {user, nickname: req.session.user.nickname});
  })
)


module.exports = router
