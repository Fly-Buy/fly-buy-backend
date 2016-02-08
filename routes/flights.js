var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  knex('flights').then(function(flights){
    res.json(flights);
  })
})

router.get('/:id', function(req, res){
  knex('flights')
  .where('id', req.params.id)
  .then(function(flight){
    res.json(flight);
  })
})

//get flights counts by user
router.get('/user/:userID', function(req, res){
  knex('flights')
  .where('user_id', req.params.userID)
  .count('id')
  .then(function(userFlightCount){
    res.json(userFlightCount[0].count);
  })
})


module.exports = router;
