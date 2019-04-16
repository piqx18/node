const requestToDataBase = require('../../client-mysql/client-mysql')

const deletePassports = async(params) => {
    console.log(`Try to delete passports with ids - ${params.ids}`)
    const query = `DELETE FROM passport WHERE id in (${params.ids})`
    await requestToDataBase(query).then(result => {
            console.log(`Records with id ${params.ids} purged - ${JSON.stringify(result)}`)
        }
    ).catch(
        error => {
            console.log(error.message)
            throw error
        }
    )
    return {
        result: 'successful',
        message: 'passports purged',
        ids: params.ids
    }
}

module.exports = deletePassports