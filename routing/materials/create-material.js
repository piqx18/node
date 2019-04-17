const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['name']

const checkMaterial = async(params) => {
    const query = `SELECT * FROM material WHERE name = '${params.name}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertMaterial = async(params) => {
    const query = `INSERT INTO material (name) VALUES ('${params.name}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createMaterial = async(params) => {
    console.log(`Try to create material with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const _checkMaterial = await checkMaterial(params)
    if (_checkMaterial.length > 0) {
        return {
            result: 'error',
            message: 'material is exist'
        }
    }
    const insertId = await insertMaterial(params)
    return {
        result: 'successfull',
        materialId: insertId
    }
}

module.exports = createMaterial