var express = require('express');
var router = express.Router();
var passport = require('../local_modules/passport_config');
var knex = require('../local_modules/knex');

router.use(function(req, res, next) {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }
  next();
})

// auth routes
// google
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/shit' }),
  function(req, res) {
    console.log(req.session);
    console.log(userEntryCheck(req.user.id));
    if (userEntryCheck(req.user.id) === 1) {
      res.redirect(process.env.FRONT_END + '/#/dashboard');
    } else {
      res.redirect(process.env.FRONT_END + '/#/firstflight');
    }
  });

// facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/shit' }),
  function(req, res) {
    res.redirect('/#/firstflight');
  });

// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect(process.env.FRONT_END + '/');
});




// this is the pg/knex query on flights table returning # of rows
function userEntryCheck(userID){
  return knex('flights')
    .where('user_id', userID)
    .count('id')
    .then(function(userFlightCount){
      return +userFlightCount[0].count;
    })
}

module.exports = router;
