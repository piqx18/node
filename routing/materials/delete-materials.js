const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const deleteMaterials = async(params) => {
    console.log(`Try to delete materials with ids - ${params.ids}`)
    const query = `DELETE FROM material WHERE id in (${params.ids})`
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
        message: 'passports purged',
        ids: params.ids
    }
}

module.exports = deleteMaterials