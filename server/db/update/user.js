let dbConnect = require('../main')

function updateUser(user, userInfo) {
  return new Promise((resolve, reject) => {
    if (user && user._id) {
      dbConnect('user').then(collection => {
        collection.updateOne(user, {$set: userInfo}, (err, result) => {
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

module.exports = updateUser