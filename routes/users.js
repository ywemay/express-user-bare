var express = require('express');
var router = express.Router();
var users = require('./../repo/users.js');
var jwt = require('jsonwebtoken');

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

router.post('/login', function(req, res){
  users.check(req.body.user, req.body.pass)
    .then(function(data){
      console.log('The shit is resolved.')
      var d = {
        user: data.user,
      }
      res.json({jwt: jwt.sign(d, process.env.JWT_SECRET)});
    })
    .catch((err)=>{
      console.log('Failed to resolve the shit.');
      res.json({error: err});
    })
});

module.exports = router;
