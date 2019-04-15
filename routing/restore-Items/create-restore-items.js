const requestToDataBase = require('../../client-mysql/client-mysql')

const checkTypeMonument = async(params) => {
    console.log(`Try to get typeMonument with id - ${params.typeMonumentId}`)
    const query = `SELECT * FROM types_of_monument where id = ${params.typeMonumentId}`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const checkCollection = async(params) => {
    console.log(`Try to get Collection with id - ${params.collectionId}`)
    const query = `SELECT * FROM collections where id = ${params.collectionId}`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const checkRestoreItem = async(params) => {
    console.log(`Try to get restore item with title - ${params.title}`)
    const query = `SELECT * FROM items WHERE title = '${params.title}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertRestoreItem = async(params) => {
    console.log(`Try to create restore item with params - ${JSON.stringify(params)}`)
    const query = `INSERT INTO items(inv_numb, type_id, collection_id, title, technique, author, size, time_of_create) 
    VALUES('${params.invNumber}', '${params.typeMonumentId}', '${params.collectionId}', '${params.title}', '${params.technique}', 
    '${params.author}','${params.size}', '${params.timeOfCreate}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const restoreItemIsExist = (title) => {
    return {
        result: 'error',
        message: `restoreItem with title - ${title} exist`
    }
}

const checkParameters = (params) => {
    let errors = []
    if (!params.invNumber) {
        errors.push('params invNumber is required')
    }
    if (!params.typeMonumentId) {
        errors.push('params typeMonumentId is required')
    }
    if (!params.collectionId) {
        errors.push('params collectionId is required')
    }
    if (!params.title) {
        errors.push('params title is required')
    }
    if (!params.technique) {
        errors.push('params technique is required')
    }
    if (!params.author) {
        errors.push('params author is required')
    }
    if (!params.size) {
        errors.push('params size is required')
    }
    if (!params.timeOfCreate) {
        errors.push('params timeOfCreate is required')
    }
    return errors
}

const createRestoreItem = async (params) => {
    const errors = checkParameters(params)
    if (errors.length > 0) {
        return {
            result: 'error',
            message: errors.join(',')
        }
    }
    const _checkTypeMonument = await checkTypeMonument(params)
    const _checkCollection = await checkCollection(params)
    if (_checkTypeMonument.length === 0 || _checkCollection.length === 0) {
        return {
            result: 'error',
            message: 'collections or typeMonument not exist'
        }
    }
    else {
        const _checkRestoreItem = await checkRestoreItem(params)
        if (_checkRestoreItem.length > 0) {
            return restoreItemIsExist(params.title)
        }
        else {
           const result = await insertRestoreItem(params)
           return {
               result: 'successful', 
               restoreId: result
           }
        }
    }
} 

module.exports = createRestoreItem