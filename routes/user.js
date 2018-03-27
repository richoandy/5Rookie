var express = require('express')
var router = express.Router()


router.get('/', (req, res) =>
  res.send("home user")
)

router.get('/profile', (req, res) =>
  res.send("profile page")
)

module.exports = router
