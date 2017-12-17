const checkToken = require('../../util/checkToken')

function token (req, res, next) {
  let tokenStatus = checkToken(req)
  if (tokenStatus === 200) {
    // token验证成功
    next()
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

module.exports = token