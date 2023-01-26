const router = require('express').Router()
const ValidationError = require('../core/exceptions')
const pacienteRepository = require('../repository/paciente')
const pacienteBodyValidator = require('../bodyValidators/paciente')
const pacienteQueryValidator = require('../queryValidator/paciente');

router.post('/', async (req, res) => {
  const { body: paciente } = req

  try {
    pacienteBodyValidator.save(paciente)
    const newPaciente = await pacienteRepository.save(paciente)

    res.status(201).send(newPaciente)
  } catch (error) {
    // Si es error de validacion, devolvemos 400
    if (error instanceof ValidationError) {
      res.status(400).send({ error: error.message })

      return
    }

    // Cualquier otro error, es 500
    res.status(500).send()
  }
})

router.get('/', async (req, res) => {
  /*
        req: Objeto que representa el Request (peticion) hecho por el cliente
        res: Objeto que representa el Response (respuesta) hecha por el servidor
    */
  try {
    pacienteQueryValidator.validate(req.query)
    res.send(await pacienteRepository.getAll())
  } catch (error) {
    // Si es error de validacion, devolvemos 400
    if (error instanceof ValidationError) {
      res.status(400).send({ error: error.message })

      return
    }

    // Cualquier otro error, es 500
    console.log(error);
    res.status(500).send()
  }
})

router.put('/:pacienteId', async (req, res) => {
  const { params: { pacienteId } } = req

  // Buscamos al paciente
  const paciente = await pacienteRepository.getById(pacienteId)

  // Preguntamos si existe el recurso
  if (paciente) {
    // Junto con la data, podemos indicar un codigo HTTP de respuesta
    res.status(200).send(paciente)
  } else {
    res.status(404).send()
  }
})

router.delete('/:pacienteId', async (req, res) => {
  const { params: { pacienteId } } = req

  // Buscamos al paciente
  const paciente = await pacienteRepository.getById(pacienteId)

  // Preguntamos si existe el recurso
  if (paciente) {
    const pacienteRemoved = await pacienteRepository.delete(pacienteId)

    // Junto con la data, podemos indicar un codigo HTTP de respuesta
    res.status(200).send(pacienteRemoved)
  } else {
    res.status(404).send()
  }
})

router.get('/:pacienteId', async (req, res) => {
  // Accedemos al objeto "req"
  const { params: { pacienteId } } = req

  const paciente = await pacienteRepository.getById(pacienteId)

  // Preguntamos si existe el recurso
  if (paciente) {
    // Junto con la data, podemos indicar un codigo HTTP de respuesta
    res.status(200).send(paciente)
  } else {
    res.status(404).send()
  }
})

module.exports = router
