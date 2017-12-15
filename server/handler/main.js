// 数据库链接

let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/website';

function DBConnect (fn, fnCallback, router) {
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    // console.log("连接成功!");
    // 数据库连接成功，执行传进来的方法
    fn(db, router, fnCallback);
  });
}

module.exports = DBConnect;