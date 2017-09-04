// server.js Template

// declare dependencies here
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// config/database.js has route to mongodb and secret
const config = require('./config/database')



// cors allow requests to this API from other domains
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

const users = require('./routes/users')


// initialize app variable
const app = express()

// connect mongoose
// mongoose.createConnection(config.database)
//
// // connection tests
// mongoose.connection.on('connected', () => {
//   console.log('connected to database ' + config.database)
// })
// mongoose.connection.on('error', (err) => {
//   console.log('database error: ' + err)
// })

mongoose.connect('mongodb://localhost/meanAuthApp', {useMongoClient: true})


// enable middleware dependencies n such
app.use(cors())
app.use(bodyParser.json())
app.use('/users', users)


app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// Set static content folder (frontend)
app.use(express.static(path.join(__dirname, './public/dist')))

// test index page route
app.get('/', (req, res) => {
  res.send('server test index')
})

// set a localhost port route and use
const port = 4000
app.listen(port, () => {
  console.log('listening on port ' + port)
})
