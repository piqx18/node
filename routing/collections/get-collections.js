const requestToDataBase = require('../../client-mysql/client-mysql')

const selectCollections = async (ids) => {
    let query = ''
    if (ids.length) {
        query = `SELECT * FROM collections WHERE id in (${ids})`
    }
    else {
        query = 'SELECT * FROM collections'
    }
    const result = await requestToDataBase(query)
    .then(result => {
            console.log(`Records with ids ${ids} obtainded - ${JSON.stringify(result)}`)
            return result
        }
    ).catch(error => {
            console.error(error.message)
            throw error
        }
    )
    return result
}

const invalidRequest = () => {
    return {
        result: 'error',
        message: 'Must contains ids'
    }
}

const getCollections = async (params) => {
    if (Array.isArray(params.ids)) {
        const result = await selectCollections(params.ids)
        return {
            result: 'successful',
            result
        }
    }
    else {
        return invalidRequest()
    }
}

module.exports = getCollections