let readBlogList = require('../db/read/blogList')
let checkToken = require('../util/checkToken')

function getBlogList(req, res) {
  // 先判断token
  let tokenStatus = checkToken(req)
  if (tokenStatus === 200) {
    // token验证成功
    success(req, res)
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

function success(req, res) {
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
          res.json({
            status: 4008,
            message: '查询文章出错',
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

module.exports = getBlogList