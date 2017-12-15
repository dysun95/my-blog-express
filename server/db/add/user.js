let dbConnect = require('../main');

function addUser (user) {
  return new Promise((resolve, reject) => {
    if (user && user.name && user.passwd) {
      dbConnect('user').then(collection => {
        collection.insert(user, (err, result) => {
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

module.exports = addUser