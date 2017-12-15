let searchUser = require('../db/search/user')

function getUser (req, res) {
  if (req.query && req.query.name) {
    let user = {
      "name": req.query.name
    }
    searchUser(user).then(result => {
      res.json({
        status: 200,
        message: 'success',
        data: result
      })
    })
  } else {
    res.json({
      status: 401,
      message: 'error',
      data: {}
    })
  }
}

module.exports = getUser;
