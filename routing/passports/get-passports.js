const requestToDataBase = require('../../client-mysql/client-mysql')
const getRestoreItem = require('../restore-Items/get-restore-item')
const getPlaceOFSave = require('../place-of-save/get-place-of-save')

const selectPassports = async(ids) => {
    console.log(`Try to get passports info with ids - ${ids}`)
    let query = ''
    if (ids.length > 0) {
        query = `SELECT * FROM passport WHERE id in (${ids})`
    } 
    else {
        query = `SELECT * FROM passport`
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

const transformItems = (passports, restoreItems, placeOfSaves) => {
    let resultArray = []
    for (let i = 0; i < passports.length; i++) {
        let currentRestoreItem = restoreItems.filter(item => item.id === passports[i].item_id)
        let currentPlaceOfSave = placeOfSaves.filter(item => item.id === passports[i].place_of_save)
        let transformItem = {
            id: passports[i].id,
            restoreItem: currentRestoreItem[0],
            reasonForRest: passports[i].reasons_for_rest,
            size: passports[i].size,
            placeOfSave: currentPlaceOfSave[0],
            dateOfTransfer: passports[i].date_of_transfer,
            specConditions: passports[i].spec_conditions,
            baseHistory: passports[i].base_history,
            statusVisual: passports[i].status_visual,
            statusGeneral: passports[i].status_general,
            eventsResult: passports[i].events_result,
            concludion: passports[i].concludion,
            recomends: passports[i].recomends,
            transfered: passports[i].transfered,
            workHead: passports[i].work_head,
            performers: passports[i].performers,
            created: passports[i].created,
            act: passports[i].act,
            program: passports[i].program,
            protocol: passports[i].protocol,
            endDate: passports[i].end_date,
            director: passports[i].director
        }
        resultArray.push(transformItem)
    }
    return resultArray
}

const getPassports = async(params) => {
    const obtainedPassports = await selectPassports(params.ids)
    if(obtainedPassports.length === 0) {
        return {
            resutl: 'error',
            message: `passports with ids - ${params.ids} not exist`
        }
    }
    const restoreItemsIds = obtainedPassports.map(items => items.item_id)
    const placeOfSaveIds = obtainedPassports.map(item => item.place_of_save)
    const restoreItems = await getRestoreItem({ids: restoreItemsIds})
    const getPlaceOfSave = await getPlaceOFSave({ids: placeOfSaveIds})
    const resultArray = transformItems(obtainedPassports, restoreItems.objects, getPlaceOfSave.objects)
    return {
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getPassports