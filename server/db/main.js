let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/website';

/**
 * 连接数据库
 * @param {String} collectionName 
 */
function dbConnect (collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      if (err) {
        reject(err);
      }
      db.collection(collectionName, (err, col) => {
        if (err) {
          reject(err)
        }
        resolve(col)
      })
    });
  });
}

module.exports = dbConnect;
