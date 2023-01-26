var app = require('./app');

const PORT = 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Service running on port ${PORT}`)
})
