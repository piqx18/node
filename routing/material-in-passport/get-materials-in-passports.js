const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')
const getMaterial = require('../materials/get-materials')

const requiredParameters = ['passportId']

const selectMaterialsInPassport = async(params) => {
    console.log(`Try to select materials in passport with id - ${params.passportId}`)
    const query = `SELECT * FROM mat_in_pas WHERE passport_id = '${params.passportId}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Materials in passport obtained with params - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const transformData = (materialInPassports, materials) => {
    const resultArray = []
    for (let i = 0; i < materialInPassports.length; i++) {
        let currentMaterial = materials.filter(element => element.id === materialInPassports[i].material_id)
        let data = {
            id: materialInPassports.id,
            note: materialInPassports[i].note,
            material: currentMaterial[0],
            priority: materialInPassports[i].priority
        }
        resultArray.push(data)
    }
    return resultArray
}

const getMaterialInPassport = async(params) => {
    const errors = checkParameters(params, requiredParameters)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const obtainedMaterialsInPassport = await selectMaterialsInPassport(params)
    if(obtainedMaterialsInPassport.length === 0) {
        return {
            result: 'error',
            message: `not exist material on passport with id - ${params.passportId}`
        }
    }
    const materialsIds = obtainedMaterialsInPassport.map(element => element.material_id)
    const materials = await getMaterial({ids: materialsIds}) 
    const resultArray = transformData(obtainedMaterialsInPassport, materials.objects)
    return { 
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getMaterialInPassport