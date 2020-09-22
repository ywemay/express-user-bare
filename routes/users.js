var express = require('express');
var router = express.Router();
const {getUserByName} = require('./../repo/users.js');

var reg = {
  labels: {
    user: 'Username',
    pass: 'Password',
    email: 'E-mail',
    submit: 'Resgister',
  },
  user: '',
  pass: '',
  email: '',
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin', function(req, res) {
  getUserByName('admin')
    .then((row) => res.json(row))
    .catch((err) => res.json({error: err}));
});

router.get('/register', function(req, res, next) {
  console.log(req);
  res.render('register', reg);
});

router.post('/register', function(req, res) {
  reg.user = req.body.user;
  reg.pass = req.body.pass;
  reg.email = req.body.email;
  console.log(reg.user);
  res.render('register', reg);
});

module.exports = router;
