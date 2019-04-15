const requestToDataBase = require('../../client-mysql/client-mysql')


const deleteCollections = async (params) => {
    console.log(`Try to delete collections with ids - ${params.ids}`)
    const query = `DELETE FROM collections WHERE id in (${params.ids})`
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
        message: 'Collections purged',
        ids: params.ids
    }
}

module.exports = deleteCollections