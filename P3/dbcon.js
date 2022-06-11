var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_smitmic5',
  password        : 'ig88c137',
  database        : 'cs340_smitmic5'
});
module.exports.pool = pool;
