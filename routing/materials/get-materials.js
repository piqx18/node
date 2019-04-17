const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const requiredParameters = ['ids']

const selectMaterials = async(params) => {
    console.log(`Try to get materials with ids - ${params.ids}`)
    let query = ''
    if (params.ids.length > 0) {
        query = `SELECT * FROM material WHERE id in (${params.ids})`
    } 
    else {
        query = `SELECT * FROM material`
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


const getMeterails = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedMaterials = await selectMaterials(params)
    if(obtainedMaterials.length === 0) {
        return {
            resutl: 'error',
            message: `materials with ids - ${params.ids} not exist`
        }
    }
    return {
        result: 'successful',
        objects: obtainedMaterials
    }
}

module.exports = getMeterails