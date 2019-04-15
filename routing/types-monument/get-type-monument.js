const requestToDataBase = require('../../client-mysql/client-mysql')

const selectTypeMonument = async (ids) => {
    console.log(`Try to select collections with ids - ${ids}`)
    let query = ''
    if (ids.length) {
        query = `SELECT * FROM types_of_monument WHERE id in (${ids})`
    }
    else {
        query = 'SELECT * FROM types_of_monument'
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

const getTypesMonument = async (params) => {
    if (Array.isArray(params.ids)) {
        const result = await selectTypeMonument(params.ids)
        return {
            result: 'successful',
            objects: result
        }
    }
    else {
        return invalidRequest()
    }
}

module.exports = getTypesMonument