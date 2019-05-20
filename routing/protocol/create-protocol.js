const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['numberProtocol', 'boardMembers', 'questions', 'dateProtocol']

const insertProtocol = async(params) => {
    const query = `INSERT INTO protocol (numberProtocol, boardMembers, questions, dateProtocol) VALUES ('${params.numberProtocol}',
    '${params.boardMembers}', '${params.questions}', '${params.dateProtocol}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createMaterial = async(params) => {
    console.log(`Try to create protocol with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const insertId = await insertProtocol(params)
    return {
        result: 'successfull',
        protocolId: insertId
    }
}

module.exports = createMaterial