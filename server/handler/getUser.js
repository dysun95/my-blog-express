let searchUser = require('../db/search/user')

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
