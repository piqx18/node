const requestToDataBase = require('../../client-mysql/client-mysql')

const updateRestoreItem = async(params) => {
    console.log(`Try to update restoreItem with invNumber - ${params.invNumber} and params - ${JSON.stringify(params)}`)
    const query = `Update items set type_id = '${params.typeMonumentId}', collection_id = '${params.collectionId}',
    title = '${params.title}', technique = '${params.technique}', author = '${params.author}', size = '${params.size}', time_of_create = '${params.timeOfCreate}'
      WHERE inv_numb = '${params.invNumber}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Restore item updated - ${JSON.stringify(result)}`)
        return {
            result: 'successfull',
            invNumber: params.invNumber
        }
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

module.exports = updateRestoreItem