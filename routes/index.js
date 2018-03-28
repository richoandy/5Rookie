var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
const cUser = require('../controllers/ControllerUser.js');

router.get('/', (req, res) =>
  res.redirect('/register')
)

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
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err.message);
  })
});

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
     res.redirect('/user/home');
    } else {
     res.send('gagal');
    }
  })
})

router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});





module.exports = router
