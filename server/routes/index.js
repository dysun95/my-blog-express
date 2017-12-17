let express = require('express')
let router = express.Router()
let handler = require('../handler/index')

let whitelist = [
  "http://localhost:8080",
  "http://www.dysun95.tk",
  "http://local.dysun95.tk",
  "http://local.dysun95.tk:8080"
]

// router中间件，可在api路由进来之后，执行此中操作，通过next再执行后续子路由
router.use(function (req, res, next) {
  if (whitelist.indexOf(req.get('origin')) !== -1) {
    res.header("Access-Control-Allow-Origin", req.get('origin'))
  }
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With")
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

router.post('/login', function (req, res) {
  handler.login(req, res)
})

router.post('/register', function (req, res) {
  handler.register(req, res)
})

router.get('/get/user', function (req, res) {
  handler.getUser(req, res)
})

router.post('/add/blog', function (req, res) {
  handler.addBlog(req, res)
})

router.get('/get/blogList', function (req, res) {
  handler.getBlogList(req, res)
})

module.exports = router
