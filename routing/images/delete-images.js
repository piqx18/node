const requestToDataBase = require('../../client-mysql/client-mysql')

const deleteImage = async(params) => {
    console.log(`Try to delete images with ids - ${params.ids}`)
    const query = `DELETE FROM images WHERE id in (${params.ids})`
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
        message: 'images purged',
        ids: params.ids
    }
}

module.exports = deleteImage