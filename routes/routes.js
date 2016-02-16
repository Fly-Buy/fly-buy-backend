var express = require('express');
var router = express.Router();
var airlines = require('./airlines');
var airports = require('./airports');
var flights = require('./flights');
var knex = require('../local_modules/knex');

// run authentication
function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
  if (process.env.testing == 'true' || req.isAuthenticated()) {
    if (process.env.testing == 'true' || userEntryCheck(req.user.flybuy_id) >= 1) {
      return next();
    }
    res.json({redirect: '/#/firstflight'})
  }
  res.json({redirect: '/#'});
}

function ensureAuth(req, res, next) {
  console.log("ensureAuth",req.isAuthenticated());
  if (process.env.testing == 'true' || req.isAuthenticated()) {
    return next();
  }
  res.send("Sign-in failed.");
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

router.use('/airlines', airlines);
router.use('/airports', airports);
router.use('/flights', ensureAuthenticated, flights);

router.get('/test', ensureAuthenticated, function(req, res){
  res.json({signedIn: 'yes'});
})

module.exports = router;
