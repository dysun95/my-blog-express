let createBlog = require('../db/create/blog')
let updateBlog = require('../db/update/blog')
let checkToken = require('../util/checkToken')

/**
 * 增加文章，生成时间戳、blogID和作者
 * @param {Object} req 
 * @param {Object} res 
 */
function addBlog(req, res) {
  let {title, content} = req.body
  let blog = {
    title: title,
    content: content
  }
  let puid = req.cookies.puid || req.query.puid || ''
  blog.author = puid
  blog.createTime = Date.now()
  if (blog && blog.title && blog.content && blog.author) {
    createBlog(blog).then(result => {
      if (result.result && result.result.ok === 1) {
        let blogNew = result.ops[0]
        updateBlog({"_id": blogNew._id}, {"blogID": blogNew._id.toString()}).then(result => {
          if (result.result.ok === 1) {
            res.json({
              status: 200,
              message: "sucess",
              data: {
                blogID: blogNew._id.toString(),
                title: blogNew.title,
                author: blogNew.author
              }
            })
          } else {
            res.json({
              status: 5000,
              message: "error",
              data: {}
            })
          }
        }).catch(err => {
          res.json({
            status: 5000,
            message: "error",
            data: {}
          })
          console.log(err)
        })
      } else {
        res.json({
          status: 5000,
          message: "error",
          data: {}
        })
      }
    }).catch(err => {
      res.json({
        status: 5000,
        message: "error",
        data: {}
      })
      console.log(err)
    })
  } else {
    res.json({
      status: 4007,
      message: '缺少文章参数',
      data: {}
    })
  }
}

module.exports = addBlog
