let searchUser = require('../db/search/user')
let sha1 = require('../util/sha1')
let encodeToken = require('../util/token').encodeToken

function login (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    searchUser({"name": user.name}).then(result => {
      if (result && result.name && result.puid && result.passwd) {
        if (result.name === user.name && result.passwd === sha1(user.passwd)) { // 用户名、密码正确
          let token = encodeToken(result.puid)
          res.cookie("puid", result.puid, { 
            // domain: '.dysun95.tk',
            path: '/',
            maxAge: 1000*60*60*24*2
          })
          res.cookie("token", token, { domain: '.dysun95.tk' ,path: '/', maxAge: 1000*60*60*24*2 })
          res.json({
            status: 200,
            message: "sucess",
            data: {
              name: result.name,
              puid: result.puid
            }
          })
        } else {
          res.json({
            status: 4003,
            message: "用户名或密码错误",
            data: {}
          })
        }
      } else {
        res.json({
          status: 4003,
          message: "用户名或密码错误",
          data: {}
        })
      }
    }).catch(err => {
      res.json({
        status: 5000,
        message: "error",
        data: {}
      })
      console.log(err)
    })
  } else {
    res.json({
      status: 4004,
      message: "用户名或密码为空",
      data: {}
    })
  }
}

module.exports = login