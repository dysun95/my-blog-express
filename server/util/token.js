let jwt = require('jwt-simple')
let moment = require('moment')

let expires = moment().add(2, 'days').valueOf()

let jwtTokenSecret = 'sundengyu'

function encodeToken(puid) {
  if (puid) {
    let token = jwt.encode({
      puid: puid,
      exp: expires
    }, jwtTokenSecret)
    return token
  } else {
    return null
  }  
}

function decodeToken(token) {
  if (token) {
    try {
      let decoded = jwt.decode(token, jwtTokenSecret)
      if (decoded.exp <= Date.now()) {
        return null
      } else {
        return decoded.puid
      }
    } catch (err) {
      return null
    }
  } else {
    return null
  }
}

module.exports.encodeToken = encodeToken
module.exports.decodeToken = decodeToken