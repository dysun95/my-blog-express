var express = require('express');
var router = express.Router();
var handler = require('../handler/index');

// router中间件，可在api路由进来之后，执行此中操作，通过next再执行后续子路由
router.use(function(req, res, next) {
  // console.log(req.method, req.url);
  // console.log(req.headers)
  next();
})

router.post('/login', function(req, res) {
  handler.login(req, res);
});

router.post('/register', function(req, res) {
  handler.register(req, res);
});

router.get('/add/user', function(req, res) {
  if (req.query.name && req.query.pwd) {
    var user = {
      name: req.query.name,
      password: req.query.pwd
    };
    handler.addUser(req, res, user);
  } else {
    res.json({
      status: 4001,
      message: 'No Name or Password'
    });
  }
});

router.get('/get/user', function(req, res) {
    handler.getUser(req, res);
});

// router.get('/select', function(req, res) {
//   var data = req.query.name
//   MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功!");
//     selectData(db, data, function(result) {
//       console.log(result);
//       db.close();
//       res.json({'result': result});
//     });
//   });
// });

module.exports = router;
