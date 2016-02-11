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
  knex('flights').insert({
    user_id: request.body.user_id,
    flight_date: request.body.flight_date,
    purchase_date: request.body.purchase_date,
    flight_number: request.body.flight_number,
    price_paid: request.body.price_paid,
    purchase_location: request.body.purchase_location,
    departure_airport_id: request.body.departure_airport_id,
    arrival_airport_id: request.body.arrival_airport_id,
    airline_id: request.body.airline_id
  })
})

router.put('/:id', function(req, res){
  knex('flights').where('id', req.params.id)
  .update({
    flight_date: request.body.flight_date,
    purchase_date: request.body.purchase_date,
    flight_number: request.body.flight_number,
    price_paid: request.body.price_paid,
    purchase_location: request.body.purchase_location,
    departure_airport_id: request.body.departure_airport_id,
    arrival_airport_id: request.body.arrival_airport_id,
    airline_id: request.body.airline_id,
    suspect: request.body.suspect
  })
})

// routes to feed dynamic user input on dashboard
// return {
//   chart01_data: [],
//   chart02_data: [],
//   chart03_data: [],
//   row_data: []
// }

router.post('/dashboard', function(req, res){
  var properties = [
    "flight_number",
    "departure_airport_id",
    "arrival_airport_id",
    "airline_id"
  ];
  var flights = knex('flights');
  // Initial where clause because andWhere can only come after a where clause
  flights.where("id", ">", 0);
  properties.forEach(function(property) {

    if(req.body.hasOwnProperty(property) && req.body[property] != null
      && req.body[property] != 'undefined') {
      flights.andWhere(property, req.body[property]);
    }
  });
  // Coerce the query builder into a promise
  flights.then(function(flights){
    var flightPrices = []
    flights.forEach((flight)=>{
      flightPrices.push(flight.price_paid)
    })
    res.json(flightPrices);
  }).catch(function(err){
    throw err;
  });
})

module.exports = router;
