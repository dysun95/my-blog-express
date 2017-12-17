let dbConnect = require('../main')

function readBlog (blog) {
  return new Promise((resolve, reject) => {
    if (blog) {
      dbConnect('blog').then(collection => {
        collection.findOne(blog, (err, result) => {
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

module.exports = readBlog
