var dotenv = require('dotenv').load();
var authID = require('../oauthIDs.js');
var knex = require('../local_modules/knex');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// strategies config
passport.use(new GoogleStrategy({
  clientID: process.env.G_CLIENTID,
  clientSecret: process.env.G_CLIENTSECRET,
  callbackURL: authID.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // process.nextTick(function () {
    // });
    insertUser(profile).then(function(id){
      console.log(id);
      profile.flybuy_id = id;
      return done(null, profile);
    })
  }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FB_CLIENTID,
//     clientSecret: process.env.FB_CLIENTSECRET,
//     callbackURL: authID.facebook.callbackURL,
//     profileFields: ['id', 'displayName', 'photos'],
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       return done(null, profile);
//     });
//   }
// ));

// insert user into users table
function insertUser(profile) {
  console.log(profile);
  return knex('users').where('oauthid', profile.id)
  .then(function(user){
    console.log(user);
    if (user.length === 0) {
      return knex('users').insert({
        first_name:   profile.name.givenName,
        last_name:    profile.name.familyName,
        oauthid:      profile.id,
        provider:     profile.provider,
        user_image:   profile.photos[0].value,
        times_visited:   1
      }).returning('id');
    } else {
      return knex('users').where('oauthid', user[0].oauthid).increment('times_visited', 1).returning('id')
    }
  })
  .then(function(result){
    console.log(result);
    return +result[0];
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports = passport;
