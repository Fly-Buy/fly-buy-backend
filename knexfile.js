<<<<<<< HEAD
var dotenv = require('dotenv').load();

=======
>>>>>>> dfde30d0208c16c0db5cfd4f976a68efb21e9727
module.exports = {

  development: {
    client: 'pg',
<<<<<<< HEAD
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    }
=======
    connection: 'postgres://localhost/fb'
>>>>>>> dfde30d0208c16c0db5cfd4f976a68efb21e9727
  },

  production: {
    client: 'pg',
<<<<<<< HEAD
    connection: process.env.DATABASE_URL + "?ssl=true",
    pool: {
      min: 2,
      max: 10
    }
=======
    connection: 'postgres://xzohfnlzxudhxr:ppzxBTyCO46jA2B5KCrfuT020g@ec2-107-21-218-93.compute-1.amazonaws.com:5432/d9qflmp2hvbc0j?ssl=true'
>>>>>>> dfde30d0208c16c0db5cfd4f976a68efb21e9727
  }

};
