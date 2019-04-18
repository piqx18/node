const requestToDataBase = require('../../client-mysql/client-mysql')
const getMaterial = require('../materials/get-materials')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const selectEvents = async(params) => {
    console.log(`Try to get events with ids - ${params.ids}`)
    let query = ''
    if (params.ids.length > 0) {
        query = `SELECT * FROM events WHERE id in (${params.ids})`
    } 
    else {
        query = `SELECT * FROM events`
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

const transformData = (events, materials) => {
    let resultArray = []
    for (let i = 0; i < events.length; i++) {
        let currentMaterial = materials.filter(element => element.id === events[i].material_id)
        let transformItem = {
            id: events[i].id,
            material: currentMaterial[0],
            event: events[i].event
        }
        resultArray.push(transformItem)
    }
    return resultArray
}

const getEvents = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedEvents = await selectEvents(params)
    if(obtainedEvents.length === 0) {
        return {
            result: 'error',
            message: `events with ids - ${params.ids} not exist`
        }
    }
    const materialsIds = obtainedEvents.map(element => element.material_id)
    const materials = await getMaterial({ids: materialsIds})
    const resultArray = transformData(obtainedEvents, materials.objects)
    return {
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getEvents