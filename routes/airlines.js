var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res){
  knex('airlines').then(function(airlines){
    res.json(airlines);
  })
})


module.exports = router;
