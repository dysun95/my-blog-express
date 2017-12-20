const readUser = require('../db/read/user')
const encrypt = require('../util/encrypt')
const encodeToken = require('../util/token').encodeToken
const resHandler = require('../util/response')

function login (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    readUser({"name": user.name}).then(result => {
      if (result && result.name && result.puid && result.passwd) {
        if (result.name === user.name && result.passwd === encrypt.sha1(user.passwd)) {
          // 用户名、密码正确
          let token = encodeToken(result.puid)
          res.cookie("puid", result.puid, { domain: '.dysun95.tk', path: '/', maxAge: 1000*60*60*24*2})
          res.cookie("token", token, { domain: '.dysun95.tk' ,path: '/', maxAge: 1000*60*60*24*2, httpOnly: true})
          resHandler(res, 200, {
            name: result.name,
            puid: result.puid
          })
        } else {
          // 用户名/密码错误
          resHandler(res, 4003)
        }
      } else {
        // 未查到此用户
        resHandler(res, 4001)
      }
    }).catch(err => {
      resHandler(res, 5000)
      console.log(err)
    })
  } else {
    resHandler(res, 4004)
  }
}

module.exports = login