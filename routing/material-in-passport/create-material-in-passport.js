const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getMaterial = require('../materials/get-materials')
const getPassport = require('../passports/get-passports')

const requiredParameters = ['passportId', 'materialId', 'note']

const insertMaterialInPassport = async(params) => {
    const query = `INSERT INTO mat_in_pas(passport_id, material_id, note, priority) VALUES('${params.passportId}', '${params.materialId}', '${params.note}', '${params.priority}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Material in passport created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createMaterialInPassport = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const material = await getMaterial({ids: [params.materialId]})
    const passport = await getPassport({ids: [params.passportId]})
    if (material.result === 'error') {
        return {
            result: 'error',
            message: material.message
        }
    }
    if (passport.result === 'error') {
        return {
            result: 'error',
            message: passport.message
        }
    }
    const id = await insertMaterialInPassport(params)
    return {
        result: 'successfull',
        idMaterialInPassport: id
    }
}

module.exports = createMaterialInPassport