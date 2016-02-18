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
  console.log(req.session);
  knex('flights').insert({
    user_id: req.user.flybuy_id,
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
  .catch(function(error){
    console.error(error);
    res.json(error);
  });
})

router.post('/dashboard/chart1', function (req, res) {
  var dashboard = {
    chart_data: [],
    row_data: []
  };
  var properties = ["flight_number", "departure_airport_id", "arrival_airport_id", "airline_id"];

  var flights = knex('flights')
  .select('flights.*', 'A.name as departure', 'B.name as arrival', 'C.name as airline',
    'C.icao')
  .from('flights')
  .leftJoin('airports as A', 'A.id', 'flights.departure_airport_id')
  .leftJoin('airports as B', 'B.id', 'flights.arrival_airport_id')
  .leftJoin('airlines as C', 'C.id', 'flights.airline_id')
  .where("flights.id", ">", 0);
  properties.forEach(function (property) {
    if (req.body.hasOwnProperty(property) && req.body[property] != null && req.body[property] != 'undefined') {
      flights.andWhere(property, req.body[property]);
    }
  });
  // flights.innerJoin('airlines', 'airline_id', 'airlines.id')
  // flights.innerJoin('airports', 'departure_airport_id', 'airports.id')
  flights.then(function(flights) {
    dashboard.row_data = flights;
    flights.forEach(function (flight) {
      var pos = dashboard.chart_data.map(function(e) {
        return e.key;
      }).indexOf(flight.airline);
      if (pos !== -1) {
        dashboard.chart_data[pos].values.push({
          x: dashboard.chart_data[pos].values.length+1,
          y: flight.price_paid,
          z: flight
        })
      } else {
        dashboard.chart_data.push({
          key: flight.airline,
          values: [{
            x:  1,
            y: flight.price_paid,
            z: flight
          }]
        });
      }
    });
    res.json(dashboard);
  });
});

router.post('/dashboard/chart1mod', function(req, res){
  var flights = knex('flights')
  .select('flights.*', 'A.name as departure', 'B.name as arrival', 'C.name as airline')
  .from('flights')
  .leftJoin('airports as A', 'A.id', 'flights.departure_airport_id')
  .leftJoin('airports as B', 'B.id', 'flights.arrival_airport_id')
  .leftJoin('airlines as C', 'C.id', 'flights.airline_id')
  .then(function(flights){
    res.json(flights);
  })

  // SELECT
  //   flights.*,
  //   A.name as departure,
  //   B.name as arrival
  // FROM
  //   flights
  // LEFT JOIN airports A on A.id = flights.departure_airport_id
  // LEFT JOIN airports B on B.id = flights.arrival_airport_id
  // ;

})

router.post('/dashboard/chart2', function(req, res){
  var dashboard = {
    chart_data: [],
    row_data: []
  };

  var properties = [
    "departure_airport_id",
    "arrival_airport_id"
  ];

  var flights = knex('flights');
  flights.where("id", ">", 0);
  properties.forEach(function(property){
    if(req.body.hasOwnProperty(property) && req.body[property] != null
      && req.body[property] != 'undefined') {
      flights.andWhere(property, req.body[property]);
    }
  })

  // TODO: if departure_airport_id
  flights.then(function(flights){
    flights.forEach((flight)=>{
      // if dashboard.chart02_data (array) has object with property label
      // matching arrival_airport_id increment its counter
      // else create an object with property label and value arrival_airport_id
      // and property value should be set to 1
      // pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');
      var pos = dashboard.chart_data.map((e)=>{return e.label;})
        .indexOf(flight.arrival_airport_id)
      if (pos >= 0){
        dashboard.chart_data[pos].value += 1;
      } else {
        dashboard.chart_data.push({
          label: flight.arrival_airport_id,
          value: 1
        })
      }
    })
    dashboard.row_data = flights;
    res.json(dashboard);
  })
})

router.post('/dashboard/chart3', function(req,res){
  var properties = [];

  var flights = knex('flights');
  flights.where("id", ">", 0);
  properties.forEach(function(property){
    if(req.body.hasOwnProperty(property) && req.body[property] != null
      && req.body[property] != 'undefined') {
      flights.andWhere(property, req.body[property]);
    }
  })
  flights.then(function(flights){
    res.json("work in progress")
  })


});

module.exports = router;
