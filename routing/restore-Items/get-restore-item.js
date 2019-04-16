const requestToDataBase = require('../../client-mysql/client-mysql')
const getCollections = require('../collections/get-collections')
const getTypeMonument = require('../types-monument/get-type-monument')

const selectRestoreItems = async(params) => {
    console.log(`Try to get restore items info with ids - ${params.ids}`)
    let query = ''
    if (params.ids.length > 0) {
        query = `SELECT * FROM items WHERE id in (${params.ids})`
    } 
    else {
        query = `SELECT * FROM items`
    }
    const result = await requestToDataBase(query)
    .then(result => {
            console.log(`Records with ids ${params.ids} has obtainded - ${JSON.stringify(result)}`)
            return result
        }
    ).catch(error => {
            console.error(error.message)
            throw error
        }
    )
    return result
}

const transformItems = (restoreItems, collections, typeMonuments) => {
    let resultArray = []
    for (let i = 0; i < restoreItems.length; i++) {
        let currentCollections = collections.objects.filter(element => element.id === restoreItems[i].collection_id)
        let currentTypeMonument = typeMonuments.objects.filter(element => element.id === restoreItems[i].type_id)
        let transformItem = {
            id: restoreItems[i].id,
            invNumber: restoreItems[i].inv_numb,
            typeMonument: currentTypeMonument,
            collection: currentCollections,
            title: restoreItems[i].title,
            technique: restoreItems[i].technique,
            author: restoreItems[i].author,
            size: restoreItems[i].size,
            timeOfCreate: restoreItems[i].time_of_create
        }
        resultArray.push(transformItem)
    }
    return {
        result: 'successfull',
        objects: resultArray
    }
}

const getRestoreItems = async(params) => {
    const obtaindedItems = await selectRestoreItems(params)
    const collectionsIds = obtaindedItems.map(items => items.collection_id)
    const typeMonumentIds = obtaindedItems.map(items => items.type_id)
    const collections = await getCollections({ids:collectionsIds})
    const typeMonumuments = await getTypeMonument({ids:typeMonumentIds})
    
    return transformItems(obtaindedItems, collections, typeMonumuments)
}


module.exports = getRestoreItems