let dbConnect = require('../main');

function createBlog (blog) {
  return new Promise((resolve, reject) => {
    if (blog && blog.title && blog.content && blog.author) {
      dbConnect('blog').then(collection => {
        collection.insert(blog, (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
      })
    } else {
      reject()
    }
  })
}

module.exports = createBlog