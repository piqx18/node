const requestToDataBase = require('../../client-mysql/client-mysql')
const checkParameters = require('../../check-parameters')

const reqiredParameters = ['itemId', 'reasonForRest', 'size', 'placeOfSave', 'dateOfTransfer', 'specConditions', 'statusVisual',  'statusGeneral',
'eventsResult', 'concludion', 'transfered', 'director', 'workHead', 'performers', 'created', 'act', 'program', 'protocol']

const checkRestoreItem = async(restoreItemId) => {
    console.log(`Try to get restoreItem with id - ${restoreItemId}`)
    const query = `SELECT * FROM items WHERE id = '${restoreItemId}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertPassport = async(params) => {
    const query = `INSERT INTO passport(item_id, reason_for_rest, size, place_of_save, date_of_transfer, spec_conditions, 
        base_history, status_visual, status_general, events_result, concludion, recomends, transfered, work_head, performers, created, act, program, protocol, 'end_date') 
        VALUES 
        ('${params.itemId}','${params.reasonForRest}','${params.size}','${params.placeOfSave}','${params.dateOfTransfer}','${params.specConditions}', '${params.baseHistory}',
        '${params.statusVisual}', '${params.statusGeneral}', '${params.eventsResult}', '${params.concludion}', '${params.transfered}', '${params.director}'
        , '${params.workHead}', '${params.performers}', '${params.created}', '${params.act}', '${params.program}', '${params.protocol}', '${params.endDate}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Passport created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createPassport = async(params) => {
    console.log(`Try to create passport with params - ${JSON.stringify(params)}`)
    const errors = checkParameters(params, reqiredParameters)
    if(errors.length > 0) {
        return {
            result: 'error',
            message: errors
        }
    }
    const restoreItem = await checkRestoreItem(params.itemId)
    if (restoreItem.length === 0) {
        return {
            result: 'error',
            message: 'restoreItemId not exist'
        }
    }
    const insertId = await insertPassport(params)
    return {
        result: 'successfull',
        restoreId: insertId
    }
}

module.exports = createPassport