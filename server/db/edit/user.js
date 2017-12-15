let dbConnect = require('../main')

function editUser(user, userInfo) {
  return new Promise((resolve, reject) => {
    if (user && user.name) {
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

module.exports = editUser