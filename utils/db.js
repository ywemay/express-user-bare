const fs = require('fs');
const pass = require('./password.js')

var file = process.env.SQLITE_DB
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();

if (!exists) {
  console.log("Creating DB file.");
  fs.openSync(file,'w');
}

var db = new sqlite3.Database(file);

if (!exists) {
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (user TEXT NOT NULL PRIMARY KEY, email TEXT, pass TEXT)");
    db.run("INSERT INTO users (user, email, pass) VALUES (?, ?, ?)",
      ['admin', 'admin@admin.loc', pass.encrypt('admin')]);
  });
}

db.each("SELECT rowid AS id, user FROM users", function(err, row) {
        console.log(row.id + ": " + row.user);
    });

module.exports = db;