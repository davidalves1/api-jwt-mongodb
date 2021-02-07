const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const database = require('./config/db.config')

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

// ROUTES
const routes = require('./routes')
const userRoutes = require('./routes/user.routes')

app.use(routes)
app.use('/api/v1', userRoutes)

module.exports = app
