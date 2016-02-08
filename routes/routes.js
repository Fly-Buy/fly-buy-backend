var express = require('express');
var router = express.Router();

// run authentication
function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
  if (process.env.testing == 'true' || req.isAuthenticated()) {
    if (process.env.testing == 'true' || userEntryCheck(req.user.id) >= 1) {
      return next();
    }
    res.redirect('/') // update this to redirect to first entry page when created (this likely will be a front-side redirect)
  }
  res.send("Sign-in failed.");
}

// this will be the pg/knex query on flights table returning # of rows
function userEntryCheck(userID){
  return 1;  // temp until function is written
}

router.get('/', function(req, res){
  res.json({ title: 'Express' });
});

router.use('/test', ensureAuthenticated, function(req, res){
  res.json({signedIn: 'yes'});
})

module.exports = router;
