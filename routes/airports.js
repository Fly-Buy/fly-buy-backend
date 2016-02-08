var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


router.get('/', function(req, res){
  knex('airports').then(function(airports){
    res.json(airports);
  })
})

router.get('/:id', function(req,res){
  knex('airports')
  .where('id', req.params.id)
  .then(function(airport){
    res.json(airport);
  })
})

router.get('/name/:name', function(req,res){
  knex('airports')
  .whereRaw('LOWER(name) LIKE ?', '%' + req.params.name.toLowerCase()+'%')
  .then(function(airports){
    res.json(airports);
  })
})

router.get('/callsign/:cs', function(req,res){
  knex('airports')
  .whereRaw('LOWER(callsign) LIKE ?', '%' + req.params.cs.toLowerCase()+'%')
  .then(function(airports){
    res.json(airports);
  })
})

router.get('/city/:city', function(req,res){
  knex('airports')
  .whereRaw('LOWER(city) LIKE ?', '%' + req.params.city.toLowerCase()+'%')
  .then(function(airports){
    res.json(airports);
  })
})

router.get('/state/:state', function(req,res){
  knex('airports')
  .whereRaw('LOWER(state) LIKE ?', '%' + req.params.state.toLowerCase()+'%')
  .then(function(airports){
    res.json(airports);
  })
})


module.exports = router;
