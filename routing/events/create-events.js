const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getMaterials = require('../materials/get-materials')

const requiredParameters = ['materialId', 'event']

const insertEvent = async(params) => {
    const query = `INSERT INTO events(material_id, event) VALUES('${params.materialId}', '${params.event}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Event created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const checkEvent = async(params) => {
    const query = `SELECT * FROM events WHERE event = '${params.event}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createEvent = async(params) => {
    console.log(`Try to create event with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0 ) {
        return {
            result: 'error',
            message: errors
        }
    }
    const checkMaterial = await getMaterials({ids: [params.materialId]})
    if (checkMaterial.result === 'error') {
        return {
            result: 'error',
            message: checkMaterial.message
        }
    } 
    const _checkEvent = await checkEvent(params)
    if (_checkEvent.length > 0) {
        return {
            result: 'error',
            message: 'event exist'
        }
    }
    const insertId = await insertEvent(params)
    return {
        result: 'successfull',
        eventId: insertId
    }
}

module.exports = createEvent