var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res){
  res.json({ title: 'Express' });
});

router.use('/test' function(req, res){
  res.json({signedIn: 'yes'});
})

module.exports = router;
