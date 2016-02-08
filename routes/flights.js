var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  knex('flights').then(function(flights){
    res.json(flights);
  })
})



module.exports = router;
