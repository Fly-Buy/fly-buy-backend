var express = require('express');
var router = express.Router();
var passport = require('../local_modules/passport_config');
var knex = require('../local_modules/knex');

// auth routes
// google
router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/shit' }),
  function(req, res) {
    insertUser(req.user);
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
    insertUser(req.user);
    res.redirect('/#/firstflight');
  });

// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect(process.env.FRONT_END + '/');
});


// insert user into users table
function insertUser(userObj) {
  knex('users').where('oauthid', userObj.id)
  .then(function(user){
    if (user.length === 0) {
      return knex('users').insert({
        first_name:   userObj.displayName.split(' ')[0],
        last_name:    userObj.displayName.split(' ')[1],
        oauthid:      userObj.id,
        provider:     userObj.provider,
        user_image:   userObj.photos[0].value,
        times_visited:   1
      })
    } else {
      return knex('users').where('oauthid', user[0].oauthid).increment('times_visited', 1)
    }
  })
  .then(function(result){
    console.log(result)
  })
  .catch(function(error){
    console.error(error);
  })
}

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
