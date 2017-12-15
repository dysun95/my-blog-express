let dbConnect = require('../main')

function searchUser (user) {
  return new Promise((resolve, reject) => {
    if (user && user.name) {
      dbConnect('user').then(collection => {
        collection.find(user).toArray((err, result) => {
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

module.exports = searchUser