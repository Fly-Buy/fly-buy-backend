var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res){
  knex('airlines').then(function(airlines){
    res.json(airlines);
  })
})

router.get('/:id', function(req,res){
  knex('airlines')
  .where('id', req.params.id)
  .then(function(airline){
    res.json(airline);
  })
})

router.get('/name/:name', function(req, res){
  knex('airlines')
  .whereRaw('LOWER(name) LIKE ?', '%' + req.params.name.toLowerCase()+'%')
  .then(function(airlines){
    res.json(airlines);
  })
})

router.get('/icao/:icao', function(req, res){
  knex('airlines')
  .whereRaw('LOWER(icao) LIKE ?', '%' + req.params.icao.toLowerCase()+'%')
  .then(function(airlines){
    res.json(airlines);
  })
})

router.get('/callsign/:cs', function(req, res){
  knex('airlines')
  .whereRaw('LOWER(callsign) LIKE ?', '%' + req.params.cs.toLowerCase()+'%')
  .then(function(airlines){
    res.json(airlines);
  })
})


module.exports = router;
