var DBConnect = require('./main');

function addUser (db, router, callback) {
  var collection = db.collection('user');
  var data = router.user || null;
  if (data) {
    collection.insert(data, function(err, result) {
      if (err) {
        console.log('Error: ' + err);
        db.close();
        return;
      }
      db.close();
      callback(result, router);
    });
  } else {
    db.close();
    console.log('addUser error, router without userInfo');
  }
}

function addUserAfter (result, router) {
  // console.log(result);
  router.res.json({'result': result});
}

module.exports = function (req, res, user) {
  DBConnect(addUser, addUserAfter, {req, res, user});
}