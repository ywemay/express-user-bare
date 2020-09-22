var bcrypt = require('bcrypt');

// bcrypt.compareSync(pass, hash);
var password = {
  encrypt: function(pass) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  },

  compare: function(pass, hash) {
    console.log(pass + ' ------- ' + hash);
    return bcrypt.compareSync(pass, hash);
  }
}

module.exports = password