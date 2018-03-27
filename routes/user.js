var express = require('express')
var router = express.Router()


router.get('/', (req, res) =>
  res.render('home.ejs')
)

router.get('/profile', (req, res) =>
  res.send("profile page")
)

module.exports = router
