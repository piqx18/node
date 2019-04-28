const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getComposition = require('../compositions/get-compostions')
const getPassport = require('../passports/get-passports')

const requiredParameters = ['passportId', 'compositionId', 'dateFrom', 'dateTo']

const insertEventInPassport = async(params) => {
    const query = `INSERT INTO events_in_pas(passport_id, composition_id, date_from, date_to)
     VALUES('${params.passportId}', '${params.compositionId}', '${params.dateFrom}', '${params.dateTo}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Event in passport created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createEventInPassport = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    } 
    const passport = await getPassport({ids: [params.passportId]})
    if (passport.result === 'error') {
        return {
            result: 'error',
            message: passport.message
        }
    }
    const id = await insertEventInPassport(params)
    return {
        result: 'successfull',
        idMaterialInPassport: id
    }
}

module.exports = createEventInPassport