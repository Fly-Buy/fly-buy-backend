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
    if (process.env.testing == 'true' || userEntryCheck(req.user.id) >= 1) {
      return next();
    }
    res.redirect('/#/firstflight') // update this to redirect to first entry page when created (this likely will be a front-side redirect)
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
router.use('/flights', flights);

router.get('/test', ensureAuthenticated, function(req, res){
  res.json({signedIn: 'yes'});
})

module.exports = router;
