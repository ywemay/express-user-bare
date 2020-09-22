const router = require('../routes');

var bcrypt = require('bcrypt');
// bcrypt.compareSync(pass, hash);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

function passHash(pass) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (user TEXT NOT NULL PRIMARY KEY, email TEXT, pass TEXT)");
  db.run("INSERT INTO users (user, email, pass) VALUES (?, ?, ?)",
    ['admin', 'admin@admin.loc', passHash('admin')]);
});

function addUser(data) {
  db.serialize(function(){
    var stmt = db.prepare("INSERT INTO users(user, email, pass) VALUES (?, ?, ?)");
    stmt.run([data.user, data.email, passHash(data.pass)]);
    stmt.finalize();
  });
}

function getUserByName(user) {
  return new Promise(function(resolve, reject) {
    db.get("SELECT * FROM users WHERE user=?", [user], function(err, row){
      if (err) {
        reject(err);
      }
      else {
        resolve(row);
      }
    });
  });
}

function checkUserPass(user, pass) {
  return new Promise(function(resolve, reject) {
    db.get("SELECT * FROM users WHERE user=?", [user], function(err, row){
      if (err) {
        reject(err);
      }
      else {
        if(!bcrypt.compareSync(row.pass, hash)) {
          reject('Invalid password');
        }
        else {
          resolve(row);
        }
      }
    });
  });
}

module.exports = {addUser, getUserByName, checkUserPass}