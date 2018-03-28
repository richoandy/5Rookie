var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
const cUser = require('../controllers/ControllerUser.js');

router.get('/', (req, res) =>
  res.send("INDEX 5 ROOKIE")
)

router.get('/login', (req, res) =>
  res.render("login")
)

router.post('/login', function(req, res) {
  let email = req.body.email
  let password = req.body.password
  cUser.findEmailLogin(email)
  .then(user => {
    if(bcrypt.compareSync(password, user.password)) {
     // Passwords match
     req.session.user = user;
     res.send(req.session.user);
    } else {
     res.send('gagal');
    }
  })
})

router.get('/register', (req, res) =>
  res.render("register")
)

router.post('/register', function(req, res) {
  let attributeUser = {
    nickname: req.body.nickname,
    password: req.body.password,
    salt: "-",
    email: req.body.email,
    position: req.body.position,
    medal: req.body.medal,
    star: req.body.star,
    link_steam: req.body.link_steam,
  };
  cUser.add(attributeUser)
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err.message);
  })
});

module.exports = router
