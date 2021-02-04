const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    localDatabaseUrl: process.env.DB_URI,
    secret: 'password',
  },
}
