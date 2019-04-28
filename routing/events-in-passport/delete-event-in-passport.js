const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const deleteEventsInPassport = async(params) => {
    console.log(`Try to purge events with ids - ${params.ids}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const query = `DELETE FROM events_in_pas WHERE id in (${params.ids})`
    await requestToDataBase(query).then(result => {
        console.log(`Records with id ${params.ids} purged - ${JSON.stringify(result)}`)
    }).catch(
    error => {
        console.log(error.message)
        throw error
    })
    return {
        result: 'successful',
        message: 'Composition In passports purged',
        ids: params.ids
    }
}

module.exports = deleteEventsInPassport