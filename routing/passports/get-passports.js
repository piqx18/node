const requestToDataBase = require('../../client-mysql/client-mysql')
const getRestoreItem = require('../restore-Items/get-restore-item')

const selectPasspots = async(ids) => {
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

const transformItems = (passports, restoreItems) => {
    let resultArray = []
    for (let i = 0; i < passports.length; i++) {
        let currentRestoreItem = restoreItems.filter(item => item.id === passports[i].item_id)
        let transformItem = {
            id: passports[i].id,
            restoreItem: currentRestoreItem,
            reasonForRest: passports[i].reason_for_rest,
            size: passports[i].size,
            placeOfSave: passports[i].place_of_save,
            dateOfTransfer: passports[i].date_of_transfer,
            specConditions: passports[i].spec_conditions,
            baseHistory: passports[i].specHistory,
            statusVisual: passports[i].status_visual,
            statusGeneral: passports[i].status_general,
            eventsResult: passports[i].events_results,
            concludion: passports[i].concludion,
            recomends: passports[i].recomends,
            transfered: passports[i].transfered,
            workHead: passports[i].work_head,
            performers: passports[i].performers,
            created: passports[i].created
        }
        resultArray.push(transformItem)
    }
    return resultArray
}

const getPassports = async(params) => {
    const obtainedPassports = await selectPasspots(params.ids)
    const restoreItemsIds = obtainedPassports.map(items => items.item_id)
    const restoreItems = await getRestoreItem({ids: restoreItemsIds})
    const resultArray = transformItems(obtainedPassports, restoreItems.objects)
    return {
        result: 'successfull',
        objects: resultArray
    }
}

module.exports = getPassports