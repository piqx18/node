const requestToDataBase = require('../../client-mysql/client-mysql')
const getPassport = require('../passports/get-passports')

const selectLabResearch = async(ids) => {
    console.log(`Try to get lab research info with ids - ${ids}`)
    let query = ''
    if (ids.length > 0) {
        query = `SELECT * FROM lab_research WHERE id in (${ids})`
    } 
    else {
        query = `SELECT * FROM lab_research`
    }
    const result = await requestToDataBase(query).then(result => {
            console.log(`Records with ids ${ids} has obtainded - ${JSON.stringify(result)}`)
            return result
        }
    ).catch(error => {
            console.error(error.message)
            throw error
        }
    )
    return result
}

const transformItems = (labResearch, passports) => {
    let resultArray = []
    for (let i = 0; i < labResearch.length; i++) {
        let currentPassport = passports.filter(item => item.id === labResearch[i].passport_id)
        let transformItem = {
            id: labResearch[i].id,
            passport: currentPassport,
            purpose: labResearch[i].purpose,
            results: labResearch[i].results,
            placeOfSave: labResearch[i].place_of_save,
            performer: labResearch[i].performer
        }
        resultArray.push(transformItem)
    }
    return resultArray
}

const getLabResearch = async(params) => {
    const obtainedLabResearch = await selectLabResearch(params.ids)
    if(obtainedLabResearch.length === 0) {
        return {
            resutl: 'error',
            message: `labResearch with ids - ${params.ids} not exist`
        }
    }
    const passportIds = obtainedLabResearch.map(items => items.passport_id)
    const passports = await getPassport({ids: passportIds})
    const resultArray = transformItems(obtainedLabResearch, passports.objects)
    return {
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getLabResearch