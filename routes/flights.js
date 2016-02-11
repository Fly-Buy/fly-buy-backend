var express = require('express');
var router = express.Router();
var knex = require('../local_modules/knex');


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

router.post('/', function(req, res){
  console.log(req.body);
  knex('flights').insert({
    user_id: req.body.user_id,
    flight_date: req.body.flight_date,
    purchase_date: req.body.purchase_date,
    flight_number: parseInt(req.body.flight_number),
    price_paid: parseInt(req.body.price_paid),
    purchase_location: req.body.purchase_location,
    departure_airport_id: parseInt(req.body.departure_airport_id),
    arrival_airport_id: parseInt(req.body.arrival_airport_id),
    airline_id: parseInt(req.body.airline_id)
  })
  .then(function(result){
    console.log(result);
  })
  .catch(function(error) {
    console.error(error);
  });
})

router.put('/:id', function(req, res){
  knex('flights').where('id', req.params.id)
  .update({
    flight_date: req.body.flight_date,
    purchase_date: req.body.purchase_date,
    flight_number: req.body.flight_number,
    price_paid: req.body.price_paid,
    purchase_location: req.body.purchase_location,
    departure_airport_id: req.body.departure_airport_id,
    arrival_airport_id: req.body.arrival_airport_id,
    airline_id: req.body.airline_id,
    suspect: req.body.suspect
  })
})

module.exports = router;
