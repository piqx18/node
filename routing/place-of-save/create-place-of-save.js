const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['placeOfSave']

const checkPlaceOFSave = async(params) => {
    const query = `SELECT * FROM place_of_save WHERE placeOFSave = '${params.placeOfSave}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`PlaceOfSave obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertPlaceOFSave = async(params) => {
    const query = `INSERT INTO place_of_save (placeOfSave) VALUES ('${params.placeOfSave}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createPlaceOfSave = async(params) => {
    console.log(`Try to create place of Save with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const _checkMaterial = await checkPlaceOFSave(params)
    if (_checkMaterial.length > 0) {
        return {
            result: 'error',
            message: 'place of save exist'
        }
    }
    const insertId = await insertPlaceOFSave(params)
    return {
        result: 'successfull',
        placeOFSave: insertId
    }
}

module.exports = createPlaceOfSave