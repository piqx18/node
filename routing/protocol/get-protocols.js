const requestToDataBase = require('../../client-mysql/client-mysql')
const getPassport = require('../passports/get-passports')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['idProtocol']

const selectProtocols = async(params) => {
    console.log(`Try to get protocols_in_passport with ids - ${params.idProtocol}`)
    let query = ''
    if (params.idProtocol.length > 0) {
        query = `SELECT * FROM protocol_in_passport WHERE protocolId in (${params.idProtocol})`
    } 
    else {
        query = `SELECT * FROM protocol_in_passport`
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
const selectProtocol = async(id) => {
    const query = `SELECT * from protocol WHERE id = ${id}`
    const result = await requestToDataBase(query).then(result => {
        console.log(`Records with ids ${id} has obtainded - ${JSON.stringify(result)}`)
        return result
    }
    ).catch(error => {
        console.error(error.message)
        throw error
    })
    return result
}

const transformData = async(obtainedProtocols) => {
    let result = []
    let passportIds = []
    for (let i = 0; i < obtainedProtocols.length; i++) {
        passportIds.push(obtainedProtocols[i].passportId)
    }
    for (let i = 0; i < obtainedProtocols.length; i++) {
        let currentPassport = await getPassport({ids: passportIds})
        let currentProtocol = await selectProtocol(obtainedProtocols[i].protocolId)
        result.push({
            id: obtainedProtocols[i].id,
            passport: currentPassport.objects,
            protocol: currentProtocol[0]
        })
    }
    return result;
}

const getProtocols = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedProtocols = await selectProtocols(params)
    if(obtainedProtocols.length === 0) {
        return {
            result: 'error',
            message: `protocols not exist`
        }
    }
    const result = await transformData(obtainedProtocols)
    return {
        result: 'successful',
        objects: result
    }
}

module.exports = getProtocols