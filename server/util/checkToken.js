let decodeToken = require('./token').decodeToken

/**
 * @description 根据request中的token和puid判断是否为有效用户
 * @param {Object} req 请求
 */
function checkToken(req) {
    let token = req.cookies.token || req.query.token || ''
    let puid = req.cookies.puid || req.query.puid || ''
    if (token && puid) {
      let puidInToken = decodeToken(token)
      if (puidInToken === puid) {
        // token验证成功
        return 200
      } else {
        // token失效
        return 4006
      }
    } else {
      // puid或token不存在
      return 4005
    }
}

module.exports = checkToken