const requestToDataBase = require('../../client-mysql/client-mysql')

const updatePassport = async(params) => {
    console.log(`Try to update passport with id - ${params.passportId} and params - ${JSON.stringify(params)}`)
    const query = `Update passport set item_id = '${params.itemId}', reasons_for_rest = '${params.reasonForRest}', size = '${params.size}',
    place_of_save_id = '${params.placeOfSaveId}', date_of_transfer = '${params.dateOfTransfer}', spec_conditions = '${params.specConditions}',
     base_history = '${params.baseHistory}', status_visual = '${params.statusVisual}', status_general = '${params.statusGeneral}',
     events_result = '${params.eventsResult}', concludion = '${params.concludion}',  recomends = '${params.recomends}', transfered = '${params.transfered}',
     work_head = '${params.workHead}', performers = '${params.performers}', created = '${params.created}', act = '${params.act}', program = '${params.program}',
     protocol = '${params.protocol}', end_date = '${params.endDate}', director = '${params.director}' WHERE id = '${params.passportId}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Record updated - ${JSON.stringify(result)}`)
        return {
            result: "successfull",
            passportId: params.passportId
        }
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

module.exports = updatePassport