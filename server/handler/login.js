let searchUser = require('../db/search/user')

function login (req, res) {
  let user = req.body
  if (user && user.name && user.passwd) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      var collection = db.collection("user");
      collection.findOne(user, function(err, result) {
        db.close();
        if (err) {
          console.log("Error: " + err);
          return res.send(401);
        }
        if (!result) {
          return res.send('Wrong username or password');
        } else {
          // console.log(1111, result);
          res.json({
            status: 200,
            message: 'success'
          });
        }
      })
    })
  } else {
    return res.send(401);
  }
}

module.exports = login