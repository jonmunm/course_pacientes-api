const ValidationError = require('../core/exceptions')

const VALUES = ['exams', 'history']

const validate = ({ fields }) => {

  if (!fields) {
    return
  }

  const params = fields.split(',')

  if (params.length === 0) {
    throw new ValidationError('Fields debe ser no vacio')
  }

  for (const param of params) {
    if (!VALUES.includes(param)) {
      throw new ValidationError('Fields debe ser [ exams | history ]')
    }
  }
}

module.exports = {
  validate
}
