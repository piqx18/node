const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getMaterial = require('../compositions/get-compostions')

const requiredParameters = ['passportId']

const selectEventInPassport = async(params) => {
    console.log(`Try to select events in passport with id - ${params.passportId}`)
    const query = `SELECT * FROM events_in_pas WHERE passport_id = '${params.passportId}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Events in passport obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const transformData = (EventInPassports, materials) => {
    const resultArray = []
    for (let i = 0; i < EventInPassports.length; i++) {
        let currentComposition = materials.filter(element => element.id === EventInPassports[i].composition_id)
        let data = {
            dateFrom: EventInPassports[i].date_from,
            dateTo: EventInPassports[i].date_to,
            composition: currentComposition[0],
        }
        resultArray.push(data)
    }
    return resultArray
}

const getEventInPassport = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedEventsInPassport = await selectEventInPassport(params)
    if(obtainedEventsInPassport.length === 0) {
        return {
            result: 'error',
            message: `not exist event on passport with id - ${params.passportId}`
        }
    }
    const compositions = await getMaterial({ids:[]}) 
    const resultArray = transformData(obtainedEventsInPassport, compositions.objects)
    return { 
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getEventInPassport