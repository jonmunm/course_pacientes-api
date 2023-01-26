const { conectar } = require('./conexion')

const getAll = async () => {
  const conexion = await conectar()
  const query = `
        SELECT *
        FROM
        pacientes
        WHERE deleted_at IS NULL
    `
  const result = await conexion.query(query)

  conexion.release()

  return result.rows
}

const getById = async (id) => {
  const conexion = await conectar()
  const query = `
        SELECT *
        FROM
        pacientes
        WHERE id = $1 AND deleted_at IS NULL
    `
  const { rows: [paciente] } = await conexion.query(query, [id])

  conexion.release()

  return paciente
}

const save = async ({ nombres, apellidos, edad }) => {
  const conexion = await conectar()
  const query = `
        INSERT INTO pacientes
            (nombre, apellidos, edad)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `
  const values = [nombres, apellidos, edad]
  const result = await conexion.query(query, values)

  conexion.release()

  return result.rows[0]
}

const deleteById = async (id) => {
  const conexion = await conectar()
  const query = `
        UPDATE pacientes
        SET deleted_at = now()
        WHERE id = $1
        RETURNING *
    `
  const result = await conexion.query(query, [id])

  conexion.release()

  return result.rows[0]
}

module.exports = {
  getAll,
  getById,
  save,
  delete: deleteById
}
