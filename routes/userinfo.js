var express = require('express');
var router = express.Router();
var knex = require('../local_modules/knex');

router.get('/', function(req, res){
  knex('users').where('oauthid', req.user.id)
    .then(function(user){
      res.json(user);
    });
})

module.exports = router;
