const requestToDataBase = require('../../client-mysql/client-mysql')
const getPassport = require('../passports/get-passports')

const requiredParameters = ['passportId', 'purpose', 'results', 'placeOfSave', 'performer']

const checkParameters = (params) => {
    let errors = []
    for (let param of requiredParameters) {
        if(params[param] === undefined) {
            errors.push(`Params ${param} is required`)
        }
    }
    return errors
}

const insertLabResearch = async(params) => {
    const query = `INSERT INTO lab_research(passport_id, purpose, results, place_of_save, performer) VALUES (
        '${params.passportId}', '${params.purpose}', '${params.results}', '${params.placeOfSave}', '${params.performer}' 
    )`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createLabResearch = async(params) => {
    console.log(`Try to create lab research with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params)
    if(errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedPassport = await getPassport({ids:[params.passportId]})
    if (obtainedPassport.result === 'successfull') {
        const insertId = await insertLabResearch(params)
        return {
            result: 'succesfull',
            labResearchId: insertId
        }
    } 
    else {
        return {
            result: 'error',
            message: 'passportId not exist'
        }
    }
}

module.exports = createLabResearch