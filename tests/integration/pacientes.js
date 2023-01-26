var request = require('supertest');
var app = require('../../server');
const { assert } = require('chai');
const apiBaseUri = '/v1/pacientes';

describe('Paciente API', () => {

    let pacienteId = null;
    describe('Guardar paciente', () => {
        it('Deberia guardar paciente', done => {
            const paciente = {
                'nombres' : 'Miguel Andres',
                'apellidos' : 'Soto Baez',
                'edad' : 36
            }

            request(app)
                .post(apiBaseUri)
                .set('Content-Type', 'application/json')
                .send(paciente)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    // Probar con Assert
                    // ...

                    const { body : { id } } = res;
                    pacienteId = id;
                    return done()
                })
        })
    })

    describe('Obtener todos', () => {
        it('Deberia traer todos los pacientes', done => {
            request(app)
                .get(apiBaseUri)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    const { body } = res;

                    assert.isNotNull(body);
                    assert.isArray(body);
                    for(const paciente of body) {
                        assert.hasAllKeys(
                            paciente, 
                            ['id', 'nombre', 'apellidos', 'edad', 'created_at', 'update_at', 'deleted_at']
                        )
                    }

                    return done()
                });
        })
    })

    describe('Obtener paciente por ID', () => {
        it('Deberia obtener paciente', done => {
            request(app)
                .get(`${apiBaseUri}/${pacienteId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    const { body : paciente } = res

                    assert.isNotNull(paciente);
                    assert.hasAllKeys(
                        paciente, 
                        ['id', 'nombre', 'apellidos', 'edad', 'created_at', 'update_at', 'deleted_at']
                    )
                    return done()
                })
        })

        it('No deberia obtener paciente', done => {
            request(app)
                .get(`${apiBaseUri}/${pacienteId + 1}`)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done()
                })
        })
    })
})