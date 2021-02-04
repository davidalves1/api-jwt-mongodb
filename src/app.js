const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes')
const database = require('./config/db.config')

console.log('ENV', process.env.NODE_ENV)

const env = process.env.NODE_ENV || 'development'

const app = express()

mongoose.Promise = global.Promise

mongoose
  .connect(database[env].localDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => console.log('Connected to mongoDB! :)'),
    (err) => {
      console.error(`Not connected do mongoDB: ${err}`)
      process.exit()
    }
  )

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(routes)

module.exports = app
