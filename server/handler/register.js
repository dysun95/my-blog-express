const readUser = require('../db/read/user')
const createUser = require('../db/create/user')
const updateUser = require('../db/update/user')
const encrypt = require('../util/encrypt')
const hexToDec = require('../util/hexToDec')
const resHandler = require('../util/response')

/**
 * 注册用户，存储用户信息，相同名字则不通过
 * @param {Object} req 请求
 * @param {Object} res 返回
 */
function register (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    readUser({name: user.name}).then(result => { // 根据name查询用户
      if (result && result.name === user.name) {
        resHandler(res, 4002)
      } else {
        user.passwd = encrypt.sha1(user.passwd) // sha1加密
        // user.puid = sha1() // puid唯一性如何保证 -> 使用mongodb生成的_id作为puid
        createUser(user).then(result => {
          if (result.result && result.result.ok === 1) {
            // 用户信息插入成功
            let userNew = result.ops[0]
            let puid = hexToDec(encrypt.md5(userNew._id.toString())).slice(0, 9)  // 数据库id使用md5加密后取前10位，将a-f变为0-5, 只是为了更随机一些, 并不能保证不唯一
            updateUser({"_id": userNew._id}, {"puid": puid}).then(result => {
              if (result.result.ok === 1) {
                res.json({
                  status: 200,
                  message: "sucess",
                  data: {
                    id: puid,
                    name: userNew.name
                  }
                })
              } else {
                // 用户id编辑失败
                resHandler(res, 5000)
              }
            }).catch(err => {
              // 用户id编辑失败, 数据库发生错误
              resHandler(res, 5000)
              console.log(err)
            })
          } else {
            // 用户信息插入失败
            resHandler(res, 5000)
          }
        }).catch(err => {
          // 用户信息插入失败, 数据库发生错误
          resHandler(res, 5000)
          console.log(err)
        })
      }
    }).catch(err => {
      // 用户信息查询失败， 数据库发生错误
      resHandler(res, 5000)
      console.log(err)
    })
  } else {
    resHandler(res, 4004)
  }
}

module.exports = register