let searchUser = require('../db/search/user')
let sha1 = require('../util/sha1')

function login (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    searchUser({"name": user.name}).then(result => {
      if (result && result.name && result.puid && result.passwd) {
        if (result.name === user.name && result.passwd === sha1(user.passwd)) { // 用户名、密码正确
          res.cookie("puid", result.puid, { domain: 'localhost:3000', maxAge: 900000 })
          res.json({
            stauts: 200,
            message: "sucess",
            data: {
              name: result.name,
              puid: result.puid
            }
          })
        } else {
          res.json({
            stauts: 4003,
            message: "用户名或密码错误",
            data: {}
          })
        }
      } else {
        res.json({
          stauts: 4003,
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
      stauts: 4004,
      message: "用户名或密码为空",
      data: {}
    })
  }
}

module.exports = login