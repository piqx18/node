const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getEvents = require('../events/get-events')

const requiredParameters = ['eventId', 'composition']

const checkComposition = async(params) => {
    const query = `SELECT * FROM compositions WHERE composition = '${params.composition}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Composition obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertComposition = async(params) => {
    const query = `INSERT INTO compositions(event_id, composition) VALUES ('${params.eventId}', '${params.composition}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Composition created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createComposition = async(params) => {
    console.log(`Try to create composition with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const checkEvent = await getEvents({ids: [params.eventId]})
    if (checkEvent.result === 'error') {
        return {
            result: 'error',
            message: checkEvent.message
        }
    }
    const _checkCompostion = await checkComposition(params)
    if(_checkCompostion.length > 0) {
        return {
            result: 'error',
            message: `composition with composition - ${params.composition} exist`
        }
    }
    const insertId = await insertComposition(params)
    return {
        result: 'successfull',
        eventId: insertId
    }
}

module.exports = createComposition