const readBlogList = require('../db/read/blogList')
const resHandler = require('../util/response')

function getBlogList(req, res) {
  let puid = req.cookies.puid || req.query.puid || ''
  if (puid) {
    let blog = {
      "author": puid
    }
    readBlogList(blog)
      .then(result => {
        if (result && result.length >= 0) {
          let blogList = []
          let length = result.length
          for (let i = 0; i < length; i++) {
            let {title, content, author, createTime, blogID} = result[i]
            blogList.push({
              title: title,
              content: content,
              author: author,
              createTime: createTime,
              blogID: blogID
            })
          }
          res.json({
            status: 200,
            message: 'success',
            data: {
              list: blogList,
              total: length
            }
          })
        } else {
          resHandler(res, 4008)
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

module.exports = getBlogList