var express = require('express');
var router = express.Router();
var airlines = require('./airlines');
var airports = require('./airports');
var flights = require('./flights');
var userinfo = require('./userinfo');
var knex = require('../local_modules/knex');

// run authentication
function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
  if (process.env.testing == 'true' || req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.FRONT_END + '/#/');
}

// this will be the pg/knex query on flights table returning # of rows
function userEntryCheck(userID){
  return knex('flights')
    .where('user_id', userID)
    .count('id')
    .then(function(userFlightCount){
      return +userFlightCount[0].count;
    })
}

router.get('/', function(req, res){
  res.json({ title: 'Express' });
});

// route to test if the user is logged in or not
router.get('/loggedin', function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.use('/airlines', airlines);
router.use('/airports', airports);
router.use('/flights', ensureAuthenticated, flights);
router.use('/userinfo', userinfo);

router.get('/test', ensureAuthenticated, function(req, res){
  res.json({signedIn: 'yes'});
})

module.exports = router;
