var ids = {
  google: {
    clientID: process.env.G_CLIENTID,
    clientSecret: process.env.G_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACK || 'https://flybuy.herokuapp.com/auth/google/callback'
  },
  facebook: {
    clientID: process.env.FB_CLIENTID,
    clientSecret: process.env.FB_CLIENTSECRET,
    callbackURL: process.env.FB_CALLBACK || 'https://flybuy.herokuapp.com/auth/facebook/callback'
  }
}

module.exports = ids;
