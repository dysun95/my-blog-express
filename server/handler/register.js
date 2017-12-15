let searchUser = require('../db/search/user')
let addUser = require('../db/add/user')
let sha1 = require('../util/sha1')

function register (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    searchUser({name: user.name}).then(result => {
      if (result && result.length >= 1 && result[0].name === user.name) {
        res.json({
          status: 405,
          message: "用户名已存在",
          data: {}
        })
      } else {
        user.passwd = sha1(user.passwd)
        addUser(user).then(result => {
          if (result.result && result.result.ok === 1 && result.result.n === 1) {
            res.json({
              status: 200,
              message: "sucess",
              data: {
                name: result.ops[0].name
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = register