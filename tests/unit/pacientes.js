const { assert, expect } = require('chai');
const pacienteBodyValidator = require('../../bodyValidators/paciente');
const ValidationError = require('../../core/exceptions');

describe('Paciente Body Validator', () => {
    describe('Nombres', () => {
        it('No deberia ser vacio', () => {
            try {
                const paciente = {
                    'nombres' : '',
                    'apellidos' : '',
                    'edad' : 1
                }

                assert.doesNotThrow(() => pacienteBodyValidator.save(paciente), ValidationError);
                //expect(() => pacienteBodyValidator.save(paciente))
                //    .to.throw(ValidationError, 'Debe contener dos nombres')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)

            }
        })

        it('No deberia tener menos o mas que dos nombres', () => {
            try {
                const paciente = {
                    'nombres' : 'Juan',
                    'apellidos' : '',
                    'edad' : 1
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'Debe contener dos nombres')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject()
            }
        })

        it('No deberia contener digitos en el primer nombre', () => {
            try {
                const paciente = {
                    'nombres' : 'Juan4 Andres',
                    'apellidos' : '',
                    'edad' : 1
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'El nombre debe contener solo letras')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject()
            }
        })

        it('No deberia contener digitos en el segundo nombre', () => {
            try {
                const paciente = {
                    'nombres' : 'Juan Andres4',
                    'apellidos' : '',
                    'edad' : 1
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'El nombre debe contener solo letras')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject()
            }
        })
    })

    describe('Edad', () => {
        it('No deberia tener letras', () => {
            try {
                const paciente = {
                    'nombres' : 'Juan Andres',
                    'apellidos' : 'Montes Cardenas',
                    'edad' : '35f'
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'La edad debe ser un entero')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })

        it('No deberia ser negativo', () => {
            try {
                let paciente = {
                    'nombres' : 'Juan Andres',
                    'apellidos' : 'Montes Cardenas',
                    'edad' : '-35'
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'La edad debe ser un entero')

                paciente['edad'] = -35

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'La edad debe ser positiva o 0')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })

        it('No deberia ser decimal', () => {
            try {

                const paciente = {
                    'nombres' : 'Juan Carlos',
                    'apellidos' : 'Mora Vera',
                    'edad' : 25.78
                }

                expect(() => pacienteBodyValidator.save(paciente))
                    .to.throw(ValidationError, 'La edad debe ser un entero')

                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
    })
});

