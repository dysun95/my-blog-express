let searchUser = require('../db/search/user')
let addUser = require('../db/add/user')
let editUser = require('../db/edit/user')
let sha1 = require('../util/sha1')

/**
 * @description 注册用户，存储用户信息，相同名字则不通过
 * @param {Object} req 请求
 * @param {Object} res 返回
 */
function register (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    searchUser({name: user.name}).then(result => { // 根据name查询用户
      if (result && result.name === user.name) {
        res.json({
          status: 4002,
          message: "用户名已存在",
          data: {}
        })
      } else {
        user.passwd = sha1(user.passwd) // sha1加密
        // user.puid = sha1() // puid唯一性如何保证 -> 使用mongodb生成的_id作为puid
        addUser(user).then(result => {
          if (result.result && result.result.ok === 1) { // 用户信息插入成功
            let userNew = result.ops[0]
            editUser({"name": userNew.name}, {"puid": userNew._id.toString()}).then(result => { // 使用mongodb的_id作为唯一puid,更新用户信息
              if (result.result.ok === 1) {
                res.json({
                  status: 200,
                  message: "sucess",
                  data: {
                    id: userNew._id.toString(),
                    name: userNew.name
                  }
                })
              } else {  // 用户id编辑失败
                res.json({
                  status: 5000,
                  message: "error",
                  data: {}
                })
              }
            }).catch(err => { // 用户id编辑失败, 数据库发生错误
              res.json({
                status: 5000,
                message: "error",
                data: {}
              })
              console.log(err)
            })
          } else { // 用户信息插入失败
            res.json({
              status: 5000,
              message: "error",
              data: {}
            })
          }
        }).catch(err => { // 用户信息插入失败, 数据库发生错误
          res.json({
            status: 5000,
            message: "error",
            data: {}
          })
          console.log(err)
        })
      }
    }).catch(err => { // 用户信息查询失败， 数据库发生错误
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

module.exports = register