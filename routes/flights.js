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
    flight_number: (req.body.flight_number ? parseInt(req.body.flight_number) : null),
    price_paid: parseInt(req.body.price_paid),
    purchase_location: (req.body.purchase_location ? req.body.purchase_location : null),
    departure_airport_id: parseInt(req.body.departure_airport_id),
    arrival_airport_id: parseInt(req.body.arrival_airport_id),
    airline_id: (req.body.airline_id ? parseInt(req.body.airline_id) : null),
    suspect: req.body.suspect
  })
  .then(function(result){
    console.log(result);
    res.json(result);
  })
  .catch(function(error) {
    console.error(error);
    res.json(error);
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
  .then(function(result){
    console.log(result);
    res.json(result);
  })
  .catch(function(error) {
    console.error(error);
    res.json(error);
  });
})

router.post('/dashboard', function(req, res){
  var dashboard = {
    chart_data: [],
    row_data: []
  };
  var properties = [
    "flight_number",
    "departure_airport_id",
    "arrival_airport_id",
    "airline_id"
  ];

  var flights = knex('flights');
  flights.where("id", ">", 0);
  properties.forEach(function(property) {
    if(req.body.hasOwnProperty(property) && req.body[property] != null
      && req.body[property] != 'undefined') {
      flights.andWhere(property, req.body[property]);
    }
  });

  flights.then(function(flights){
    flights.forEach((flight)=>{
      dashboard.chart_data.push(flight.price_paid);
      dashboard.row_data = flights;
    })
    res.json(dashboard);
  })
})

module.exports = router;

// var propertiesChart2 = [
//   "departure_airport_id",
//   "arrival_airport_id"
// ];
//
// var propertiesChart3 = [
//   "airline_id",
//   "departure_airport_id",
//   "arrival_airport_id",
//   "flight_date"
// ]

// var flightsChart2 = knex('flights');
// flightsChart2.where("id", ">", 0);
// propertiesChart2.forEach(function(property){
//   if(req.body.hasOwnProperty(property) && req.body[property] != null
//     && req.body[property] != 'undefined') {
//     flightsChart2.andWhere(property, req.body[property]);
//   }
// })
//
// var flightsCharts3 = knex('flights');
// flightsChart3.where("id", ">", 0);
// propertiesChart3.forEach(function(property){
//   if(req.body.hasOwnProperty(property) && req.body[property] != null
//     && req.body[property] != 'undefined') {
//     flightsChart3.andWhere(property, req.body[property]);
//   }
// })


// Coerce the query builder into a promise
// flights.then(function(flights){
//   var flightPrices = []
//   flights.forEach((flight)=>{
//     flightPrices.push(flight.price_paid)
//   })
//   res.json(flightPrices);
// }).catch(function(err){
//   throw err;
// });

// flights.then(function(flights){
//   flightsChart2.then(function(flights2){
//     flightsChart3.then(function(flights3){
//       // TODO: if any of the 4 req.body vars
//       flights.forEach((flight)=>{
//         dashboard.chart01_data.push(flight.price_paid);
//         dashboard.row_data = flights;
//       })
//       // TODO: if departure_airport_id
//       flights2.forEach((flight)=>{
//         // if dashboard.chart02_data (array) has object with property label
//         // matching arrival_airport_id increment its counter
//         // else create an object with property label and value arrival_airport_id
//         // and property value should be set to 1
//         // pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');
//         var pos = dashboard.chart02_data.map((e)=>{return e.label;})
//           .indexOf(flight.arrival_airport_id)
//         if (pos >= 0){
//           dashboard.chart02_data[pos].value += 1;
//         } else {
//           dashboard.chart02_data.push({
//             label: flight.arrival_airport_id,
//             value: 1
//           })
//         }
//       })
//       // TODO: if airline_id && departure_airport_id && arrival_airport_id && flight_date
//       flights3.forEach((flight)=>{
//         // line graph of prices +/- 7 days of flight_date
//         // TODO: install moment.js
//
//       })
//     })
//   })
// })
