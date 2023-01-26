const ValidationError = require('../core/exceptions')

const save = paciente => {
  let { nombres, apellidos, edad } = paciente

  // Limpieza basica
  nombres = nombres.trim()
  apellidos = apellidos.trim()

  // Nombres
  if (nombres.split(' ').length !== 2) {
    throw new ValidationError('Debe contener dos nombres')
  }

  if (nombres.match(/\d/g) !== null) {
    throw new ValidationError('El nombre debe contener solo letras')
  }

  // Apellidos
  if (apellidos.split(' ').length !== 2) {
    throw new ValidationError('Debe contener dos apellidos')
  }

  if (apellidos.match(/\d/g) !== null) {
    throw new ValidationError('Los apellidos deben contener solo letras')
  }

  // Edad
  if (Number.isInteger(edad)) {
    if (edad < 0) {
      throw new ValidationError('La edad debe ser positiva o 0')
    }
  } else if (edad.toString().match(/\D/g) !== null) {
    throw new ValidationError('La edad debe ser un entero')
  } else if (parseInt(edad, 10) < 0) {
    throw new ValidationError('La edad debe ser positiva o 0')
  }
}

module.exports = {
  save
}
