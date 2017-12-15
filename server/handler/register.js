var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/website';
var sha1 = require('../util/sha1');

function register (req, res) {
  var data = req.body;
  if (data && data.name && data.passwd) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      var collection = db.collection("user");
      collection.findOne({name: data.name}, function(err, result) {
        if (err) {
          db.close();
          console.log("Error: " + err);
          return res.sendStatus(401);
        }
        if (result) {
          db.close();
          return res.send('Username has been used');
        } else {
          data.passwd = sha1(data.passwd);
          collection.insert({name: data.name, passwd: data.passwd}, function(err, result) {
            db.close();
            if (err) {
              console.log("Error: " + err);
              return res.sendStatus(401);
            }
            if (result.result.ok === 1) {
              res.json({
                status: 200,
                message: 'sucess'
              })
            } else {
              return res.sendStatus(401);
            }
          })
        }
      })
    })
  } else {
    return res.sendStatus(401);
  }
}

module.exports = register