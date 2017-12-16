let dbConnect = require('../main')

function searchUser (user) {
  return new Promise((resolve, reject) => {
    if (user) {
      dbConnect('user').then(collection => {
        collection.findOne(user, (err, result) => {
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