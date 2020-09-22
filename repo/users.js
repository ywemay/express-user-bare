const router = require('../routes');
const db = require('../utils/db.js');
const passwd = require('../utils/password.js');
var jwt = require('jsonwebtoken');

var users = {
  add: function(data) {
    db.serialize(function(){
      var stmt = db.prepare("INSERT INTO users(user, email, pass) VALUES (?, ?, ?)");
      stmt.run([data.user, data.email, passwd.encrypt(data.pass)]);
      stmt.finalize();
    });
  },

  getByName: function(user) {
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
  },

  check: function(user, pass) {
    return new Promise(function(resolve, reject) {
      if (!user || !pass) {
        reject('Invalid username or password');
        return;
      }
      db.get("SELECT * FROM users WHERE user=?", [user], function(err, row){
        if (err) {
          reject(err);
        }
        else if(row) {
          if(!passwd.compare(pass, row.pass)) {
            console.log('Failed to compare the password...');
            reject('Invalid password');
          }
          else {
            console.log('Intending to resolve the row.');
            resolve(row);
          }
        }
        else {
          console.log('No user found');
          reject('No user found');
        }
      });
      return;
    });
  }
};

module.exports = users