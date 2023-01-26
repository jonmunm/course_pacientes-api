var app = require('./server');

const PORT = 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Service running on port ${PORT}`)
})
