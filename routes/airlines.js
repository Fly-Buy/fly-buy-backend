var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res){
  knex('airlines').then(function(airlines){
    res.json(airlines);
  })
})

router.get('/:name', function(req, res){
  knex('airlines')
  .whereRaw('LOWER(name) LIKE ?', '%' + req.params.name.toLowerCase()+'%')
  .then(function(airlines){
    res.json(airlines);
  })
})


module.exports = router;
