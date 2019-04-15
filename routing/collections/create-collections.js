const requestToDataBase = require('../../client-mysql/client-mysql')

const checkCollection = async(params) => {
    console.log(`Try to get collections with title ${params.title}`)
    const query = `SELECT * FROM collections WHERE title = '${params.title}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertCollection = async(params) => {
    console.log(`Try to create collections with params - ${JSON.stringify(params)}`)
    const query = `INSERT INTO collections(title, year, monument, expedition, chief) VALUES('${params.title}', '${params.year}', '${params.monument}', '${params.expedition}',
    '${params.chief}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const collectionIsExist = (params) => {
    return {
        result: 'error',
        message: `collections with title - ${params.title} exist`
    }
}

const createCollection = async(params) => {
    const _checkCollection = await checkCollection(params)
    if (_checkCollection.length > 0) {
        return collectionIsExist(params)
    }
    else if(_checkCollection.length === 0) {
        const collectionId = await insertCollection(params)
        return {
            result: "successful",
            message: 'collections created',
            collectionId
        }
    }
}

module.exports = createCollection