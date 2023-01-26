var app = require('./server');
console.log(`Env; ${process.env.NODE_ENV}`)
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Env; ${process.env.NODE_ENV}`)
  // eslint-disable-next-line no-console
  console.log(`Service running on port ${PORT}`)
})
