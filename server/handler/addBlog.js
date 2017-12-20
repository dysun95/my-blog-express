const createBlog = require('../db/create/blog')
const updateBlog = require('../db/update/blog')
const checkToken = require('../util/checkToken')
const resHandler = require('../util/response')

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
            resHandler(res, 5000)
          }
        }).catch(err => {
          resHandler(res, 5000)
          console.log(err)
        })
      } else {
        resHandler(res, 5000)
      }
    }).catch(err => {
      resHandler(res, 5000)
      console.log(err)
    })
  } else {
    resHandler(res, 4007)
  }
}

module.exports = addBlog
