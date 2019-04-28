const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getMaterials = require('../materials/get-materials')

const requiredParameters = ['materialId', '_event']

const insertEvent = async(params) => {
    const query = `INSERT INTO events(material_id, event) VALUES('${params.materialId}', '${params._event}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Event created with params - ${JSON.stringify(result)}`)
        return result.insertId
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
    const insertId = await insertEvent(params)
    return {
        result: 'successfull',
        eventId: insertId
    }
}

module.exports = createEvent