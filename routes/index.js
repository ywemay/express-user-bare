var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express: User Bare API' });
});

router.get('/json', function(rea, res) {
  var resp = {
    name: 'Express user bare', 
    description: 'Simple express user bare application.'
  };
  res.json(resp);
});

module.exports = router;
