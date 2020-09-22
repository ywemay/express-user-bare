var jwt = require('jsonwebtoken');
import cryptoJS from 'crypto-js';

// var fs = require('fs')
// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
// @link: https://github.com/auth0/node-jsonwebtoken

function getToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET);
}

function encryptPassword(pass) {
  return cryptoJS.AES.encrypt(pass, privateKey);
}

function login(user, pass) {
  // log in logic goes here
  console.log(user);
  console.log(encryptPassword(pass));
  return getToken({username: user});
}

module.exports = { getToken, login }