var express = require('express')
var router = express.Router()
const cUser = require('../controllers/ControllerUser.js');
const model = require('../models');

router.get('/', (req, res) =>
  res.render('home.ejs')
)

router.get('/profile', (req, res) =>
  res.send("profile page")
)

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
