const readBlog = require('../db/read/blog')
const resHandler = require('../util/response')

function getBlog (req, res) {
  let puid = req.cookies.puid || req.query.puid || ''
  if (puid) {
    let blogID = req.query.blogID
    if (blogID) {
      let queryArg = {
        blogID: blogID,
        author: puid
      }
      readBlog(queryArg).then(result => {
        if (result && result.blogID) {
          let {_id, ...blog} = result
          resHandler(res, 200, blog)
        } else {
          resHandler(res, 4011)
        }
      }).catch(err => {
        resHandler(res, 5000)
        console.log(err)
      })
    } else {
      // 缺少blogID
      resHandler(res, 4010)
    }
  } else {
    // 缺少puid参数
    resHandler(res, 4009)
  }
}

module.exports = getBlog