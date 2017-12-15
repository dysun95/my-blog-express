var express = require('express')
var router = express.Router()
var handler = require('../handler/index')

// router中间件，可在api路由进来之后，执行此中操作，通过next再执行后续子路由
router.use(function(req, res, next) {
  // console.log(req.method, req.url)
  // console.log(req.headers)
  next()
})

router.post('/login', function(req, res) {
  handler.login(req, res)
})

router.post('/register', function(req, res) {
  handler.register(req, res)
})

router.get('/get/user', function(req, res) {
    handler.getUser(req, res)
})

module.exports = router
