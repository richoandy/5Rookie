var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const cUser = require('../controllers/ControllerUser.js');
const model = require('../models')

const formatStar = require('../helpers/format_star_helper');


router.get('/', function(req, res){
  let objBg = {
    imageLink: "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/29571244_10209847828866434_2454705691265730718_n.jpg?_nc_cat=0&oh=d0220b49b4b8afa517ec96de9e2bccc9&oe=5B3E77C5"
  }
  res.render('welcome', {objBg})
})

router.get('/login', (req, res) =>
  res.render("login", {err:"none"})
)

router.post('/login', function(req, res) {
  let email = req.body.email
  let password = req.body.password
  cUser.findEmailLogin(email)
  .then(user => {
    if (user.loginCheck(password)) {
      req.session.user = user;
      res.redirect('/user/home');
    }else{
      res.render("login", {err:"wrong email/password"})
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
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err.message);
  })
});

router.get('/login', (req, res) =>
  res.render("login", {err:"none"})
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
     res.render("login", {err:"wrong email/password"})
    }
  })
})

router.get('/logout', function(req, res, next) {
    if(req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }, function(req, res, next) {
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

router.post('/search', function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}, function(req, res) {
  res.locals.formatStar = formatStar;
  let search = req.body.search;
  model.User.searchBy(search)
  .then(users => {
    model.Team.findAll({
      where: {
        nama: {
          $iLike: `%${search}%`
        }
      },
      include: [
        {
          model: model.User,
          as: 'ketua'
        }
      ]
    })
    .then(teams => {
      res.render('search', {users, teams, nickname: req.session.user.nickname, userId: req.session.user.id})
    })
  })
});

module.exports = router
