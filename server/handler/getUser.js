let searchUser = require('../db/search/user')
let checkToken = require('../util/checkToken')

/**
 * @description 查询用户信息, 单条, 查询条件为name
 * @param {Object} req 请求
 * @param {Object} res 返回
 */
function getUser (req, res) {
  // 先判断token
  let tokenStatus = checkToken(req)
  if (tokenStatus === 200) {
      // token验证成功
      sucess(req, res)
  } else if (tokenStatus === 4006) {
    // token失效
    res.json({
      status: 4006,
      message: 'token失效',
      data: {}
    })
  } else if (tokenStatus === 4005) {
    // token或puid不存在
    res.json({
      status: 4005,
      message: 'token或puid不存在',
      data: {}
    })
  }
}

function sucess (req, res) {
  if (req.query && req.query.name) {
    let user = {
      "name": req.query.name
    }
    searchUser(user)
      .then(result => {
        if (result.name && result.puid) {
          let {name, puid} = result
          res.json({
            status: 200,
            message: 'success',
            data: {
              name: name,
              puid: puid
            }
          })
        } else {
          res.json({
            status: 4001,
            message: '用户不存在',
            data: {}
          })
        }
      })
      .catch(err => {
        res.json({
          status: 5000,
          message: 'error',
          data: {}
        })
      })
  } else {
    res.json({
      status: 4000,
      message: 'error',
      data: {}
    })
  }
}

module.exports = getUser;
