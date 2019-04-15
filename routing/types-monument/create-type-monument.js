const requestToDataBase = require('../../client-mysql/client-mysql')


const checkTypeMonument = async(type) => {
    console.log(`Try to get types monument with type ${type}`)
    const query = `SELECT * FROM types_of_monument WHERE type = '${type}'`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const insertTypeMonument = async(params) => {
    console.log(`Try to create typeMonument with data - ${JSON.stringify(params)}`)
    const query = `INSERT INTO types_of_monument(type) VALUES ('${params.type}')`
    const result = await requestToDataBase(query).then(result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result.insertId
    }).catch(error => {
        console.log(error)
        throw error
    })
    return result
}

const typeMonumentIsExist = (type) => {
    return {
        result: 'error',
        message: `type monument with type - ${type} exist`
    }
}


const createTypeMonument = async(params) => {
    const _checkTypeMonument = await checkTypeMonument(params.type)

    if (_checkTypeMonument.length > 0) {
        return typeMonumentIsExist(params.type)
    }
    else {
        const typeMonumentId = await insertTypeMonument(params)
        return {
            result: "successful",
            message: 'typeMonument created',
            typeMonumentId
        }
    }
}

module.exports = {
    createTypeMonument,
    checkTypeMonument
}