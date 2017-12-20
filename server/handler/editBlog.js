const updateBlog = require('../db/update/blog')
const resHandler = require('../util/response')

function editBlog (req, res) {
  let puid = req.cookies.puid || req.query.puid || req.body.puid || ''
  if (puid) {
    let blogID = req.body.blogID
    if (blogID) {
      let title = req.body.title
      let content = req.body.content
      if (title || content) {
        let queryArg = {
          blogID: blogID,
          author: puid
        }
        let updateInfo = {}
        if (title) {
          updateInfo.title = title
        }
        if (content) {
          updateInfo.content = content
        }
        updateBlog(queryArg, updateInfo).then(result => {
          if (result.result.ok === 1) {
            resHandler(res, 200, {
              blogID: blogID,
              author: puid
            })
          }
        }).catch(err => {
          resHandler(res, 5000)
          console.log(err)
        })
      } else {
        // 缺少文章参数
        resHandler(res, 4007)
      }
    } else {
      // 缺少blogID参数
      resHandler(res, 4010)
    }
  } else {
    // 缺少puid参数
    resHandler(res, 4009)
  }
}

module.exports = editBlog