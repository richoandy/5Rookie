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
   model.UserTeam.build({
     TeamId: newTeam.id,
     UserId: req.session.user.id,
     position: req.session.user.position
   }).save()
   .then(() => {
     res.redirect("/user/teams")
   });
 })
})

router.get('/teams/delete/:id', (req, res) =>
 cTeam.delete(req.params.id)
 .then(function(success){
   model.UserTeam.destroy({
     where: {TeamId: req.params.id}
   })
   .then(function(success){
     res.redirect('/user/teams')
   })
 })
)

router.get('/teams', (req, res) =>
  model.User.findOne({
    where: {
      id: req.session.user.id
    },
    include : [
      {
        model: model.UserTeam,
        include: [
          {
            model: model.Team
          }
        ]
      }
    ]
  })
  .then(user => {
    res.render('my_team', {user, nickname: req.session.user.nickname});
  })
)

router.get('/teams/:id/detail', (req, res) =>
  model.UserTeam.findAll({
    where: {TeamId: req.params.id},
    include: [{model: model.User}],
    order:[['position', 'ASC']]
  })
  .then(function(teamData){
    model.User.findAll()
    .then(function(user){
      let pos1 = []
      let pos2 = []
      let pos3 = []
      let pos4 = []
      let pos5 = []

      for (var i = 0; i < user.length; i++) {
        if (user[i].position === "Position 1") {
          pos1.push(user[i])
        }
        if (user[i].position === "Position 2") {
          pos2.push(user[i])
        }
        if (user[i].position === "Position 3") {
          pos3.push(user[i])
        }
        if (user[i].position === "Position 4") {
          pos4.push(user[i])
        }
        if (user[i].position === "Position 5") {
          pos5.push(user[i])
        }
      }
      res.render('my_team_detail', {teamMembers: teamData, nickname: req.session.user.nickname, pos1:pos1, pos2:pos2, pos3:pos3, pos4:pos4, pos5:pos5})
    })
  })


)




module.exports = router
