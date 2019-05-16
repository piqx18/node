const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const deletePlaceOFSave = async(params) => {
    console.log(`Try to delete place_of_save with ids - ${params.ids}`)
    const query = `DELETE FROM place_of_save WHERE id in (${params.ids})`
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    await requestToDataBase(query).then(result => {
        console.log(`Records with id ${params.ids} purged - ${JSON.stringify(result)}`)
    }).catch(
    error => {
        console.log(error.message)
        throw error
    })
    return {
        result: 'successful',
        message: 'place_of_save purged',
        ids: params.ids
    }
}

module.exports = deletePlaceOFSave