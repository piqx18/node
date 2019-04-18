const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getEvents = require('../events/get-events')

const requiredParameters = ['ids']

const selectCompositions = async(params) => {
    console.log(`Try to get compositions with ids - ${params.ids}`)
    let query = ''
    if (params.ids.length > 0) {
        query = `SELECT * FROM compositions WHERE id in (${params.ids})`
    } 
    else {
        query = `SELECT * FROM compositions`
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

const transformData = (compositions, events) => {
    let resultArray = []
    for (let i = 0; i < compositions.length; i++) {
        let currentEvent = events.filter(element => element.id === compositions[i].event_id)
        let transform = {
            id: compositions[i].id,
            event: currentEvent[0],
            composition: compositions[0].composition
        }
        resultArray.push(transform)
    }
    return resultArray
}

const getCompositions = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedCompositions = await selectCompositions(params)
    if(obtainedCompositions.length === 0) {
        return {
            result: 'error',
            message: `compositions with ids - ${params.ids} not exist`
        }
    }
    const eventsIds = obtainedCompositions.map(element => element.event_id)
    const events = await getEvents({ids: eventsIds})
    const resultArray = transformData(obtainedCompositions, events.objects)
    return {
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getCompositions