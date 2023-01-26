const { Pool } = require('pg')
const {
  DATABASE_USER,
  DATABASE_URL,
  DATABASE_PWD,
  DATABASE_NAME
} = require('../core/settings');

const pool = new Pool({
  user: DATABASE_USER,
  host: DATABASE_URL,
  port: 5432,
  database: DATABASE_NAME,
  password: DATABASE_PWD
})

const conectar = async () => {
  const client = await pool.connect()

  return client
}

exports.conectar = conectar
