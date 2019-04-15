const requestToDataBase = require('../../client-mysql/client-mysql')


const deleteTypeMonument = async(params) => {
    console.log(`Try to delete typeMonument with ids - ${params.ids}`)
    const query = `DELETE FROM types_of_monument WHERE id in (${params.ids})`
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
        message: 'typeMonuments purged',
        ids: params.ids
    }
}

module.exports = deleteTypeMonument