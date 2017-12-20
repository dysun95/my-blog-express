const readUser = require('../db/read/user')
const checkToken = require('../util/checkToken')
const resHandler = require('../util/response')

/**
 * @description 查询用户信息, 单条, 查询条件为name
 * @param {Object} req 请求
 * @param {Object} res 返回
 */
function getUser (req, res) {
  if (req.query && req.query.name) {
    let user = {
      "name": req.query.name
    }
    readUser(user)
      .then(result => {
        if (result.name && result.puid) {
          let {name, puid} = result
          resHandler(res, 200, {
            name: name,
            puid: puid
          })
        } else {
          resHandler(res, 4001)
        }
      })
      .catch(err => {
        resHandler(res, 5000)
        console.log(err)
      })
  } else {
    resHandler(res, 4000)
  }
}

module.exports = getUser
