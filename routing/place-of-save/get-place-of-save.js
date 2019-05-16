const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const selectPlaceOfSave = async(params) => {
    console.log(`Try to get materials with ids - ${params.ids}`)
    let query = ''
    if (params.ids.length > 0) {
        query = `SELECT * FROM place_of_save WHERE id in (${params.ids})`
    } 
    else {
        query = `SELECT * FROM place_of_save`
    }
    const result = await requestToDataBase(query).then(result => {
        console.log(`Records with ids ${params.ids} has obtainded - ${JSON.stringify(result)}`)
        return result
    }
    ).catch(error => {
        console.error(error.message)
        throw error
    })
    return result
}

const getPlaceOfSave = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedPlaceOfSave = await selectPlaceOfSave(params)
    if(obtainedPlaceOfSave.length === 0) {
        return {
            result: 'error',
            message: `place of save with ids - ${params.ids} not exist`
        }
    }
    return {
        result: 'successful',
        objects: obtainedPlaceOfSave
    }
}

module.exports = getPlaceOfSave