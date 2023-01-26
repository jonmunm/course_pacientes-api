const { assert } = require('chai');

describe('Objetos de Javascript', () => {
    it('Deberia pasar estos test de Array', () => {
        assert.isArray([])
        assert.isNotArray({})

        assert.include([1,2,3,4,5], 5)
        assert.notInclude([1,2,3,4,5], 6)

        assert.lengthOf([1,2,3], 3)
        assert.isTrue([1,2,3].length === 3)
    })

    it('Deberia pasar estos test de Object', () => {
        const obj = {
            'uno' : 1,
            'dos' : 2,
            'tres' : 3,
            'cuatro' : 4
        }
        
        // Probar si tiene las keys/props
        assert.hasAnyKeys(obj, ['uno'])
        assert.hasAnyKeys(obj, ['dos', 'tres'])
        assert.doesNotHaveAnyKeys(obj, ['cinco', 'seis'])
        assert.hasAllKeys(obj, ['uno', 'dos', 'tres', 'cuatro'])

        // Probar el tipo
        assert.isTrue(obj instanceof Object)
        assert.isObject(obj)

        return Promise.resolve()
    })
})

