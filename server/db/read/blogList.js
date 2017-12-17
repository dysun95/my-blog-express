let dbConnect = require('../main')

/**
 * @description 根据author来查询列表, 根据生成时间降序, 即返回最新的
 * @param {Object} blog 
 */
function readBlogList (blog) {
  return new Promise((resolve, reject) => {
    if (blog) {
      dbConnect('blog').then(collection => {
        collection.find(blog).sort({"createTime": -1}).toArray((err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
      }).catch(err => {
        reject(err)
      })
    } else {
      reject()
    }
  })
}

module.exports = readBlogList
