var express = require('express')
var router = express.Router()


router.get('/', (req, res) =>
  res.send("INDEX 5 ROOKIE")
)

router.get('/login', (req, res) =>
  res.send("login page")
)

module.exports = router
