const requestToDataBase = require('../../client-mysql/client-mysql')

const deleteRestoreItems = async(params) => {
    console.log(`Try to delete restore items with ids - ${params.ids}`)
    const query = `DELETE FROM items WHERE id in (${params.ids})`
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
        message: 'restore items purged',
        ids: params.ids
    }
}

module.exports = deleteRestoreItems