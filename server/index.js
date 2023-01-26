const express = require('express')
const app = express()
const routes = require('../routes/routes')

app.use(express.json())
app.use(routes)

app.get('/ping', (req, res) => {
  res.send('Service is running')
})

module.exports = app