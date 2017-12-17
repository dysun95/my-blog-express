const express = require('express')
const router = express.Router()
const handler = require('../handler/index')
const token = require('./middleware/token')

const multer  = require('multer')
const crypto = require('crypto')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/image')
  },
  filename: function (req, file, cb) {
    let nameHash = crypto.createHash('md5')
                        .update(file.originalname)
                        .digest('hex')
    let type = /\.[^\.]*$/.exec(file.originalname)
    cb(null, nameHash + type)
  }
})

const upload = multer({ storage: storage })

const whitelist = [
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

router.get('/get/user', token, function (req, res) {
  handler.getUser(req, res)
})

router.post('/add/blog', token, function (req, res) {
  handler.addBlog(req, res)
})

router.get('/get/blogList', token, function (req, res) {
  handler.getBlogList(req, res)
})

router.post('/upload/image', token)
router.post('/upload/image', upload.single('image'), function (req, res) {
  res.json({
    status: 200,
    message: 'success',
    data: {
      name: req.file.filename
    }
  })
})

module.exports = router
