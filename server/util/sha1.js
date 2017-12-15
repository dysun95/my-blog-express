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

module.exports = sha1