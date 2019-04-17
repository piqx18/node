const requestToDataBase = require('../../client-mysql/client-mysql')

const deleteLabResearch = async(params) => {
    console.log(`Try to delete lab research with ids - ${params.ids}`)
    const query = `DELETE FROM lab_research WHERE id in (${params.ids})`
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
        message: 'lab research purged',
        ids: params.ids
    }
}

module.exports = deleteLabResearch