let dbConnect = require('../main')

function updateBlog(blog, blogInfo) {
  return new Promise((resolve, reject) => {
    if (blog && blog._id) {
      dbConnect('blog').then(collection => {
        collection.updateOne(blog, {$set: blogInfo}, (err, result) => {
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

module.exports = updateBlog