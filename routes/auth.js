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
    res.redirect('/#/firstflight');
  });

// facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/shit' }),
  function(req, res) {
    insertUser(req.user);
    res.redirect('/test');
  });

// app logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/firstflight');
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

module.exports = router;
