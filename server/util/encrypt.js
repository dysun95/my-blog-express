/**
 *@argument before sha1加密前的值
 *@returns sha1加密后的值 
 */

var crypto = require('crypto')
var secret = 'sundengyu'

function sha1 (before) {
  return crypto.createHmac('sha1', secret)
              .update(before)
              .digest('hex')
}

function md5 (before) {
  return crypto.createHash('md5')
              .update(before)
              .digest('hex')
}

module.exports.sha1 = sha1
module.exports.md5 = md5