const requestToDataBase = require('../../client-mysql/client-mysql')
const fs = require('fs')

const insertImageInPassport = async(params) => {
    const query = `INSERT INTO images(passport_id, image, comment, work_time, date, filename) VALUES (
        '${params.passportId}', '${null}', '${params.comment}', '${params.workTime}', '${params.date}', '${params.fileName}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Lab research created with params - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const createImageInPassport = async(params) => {
    console.log(`Try to create image in passport with params ${JSON.stringify(params)}`)
    const result = await insertImageInPassport(params)
    return {
        result: 'successfull',
        imageInPassportId: result
    }
}

module.exports = createImageInPassport;