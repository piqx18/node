const requestToDataBase = require('../../client-mysql/client-mysql')

const selectImages = async(ids) => {
    console.log(`Try to get images with ids - ${ids}`)
    let query = ''
    if (ids.length > 0) {
        query = `SELECT * FROM images WHERE passport_id in (${ids})`
    } 
    else {
        query = `SELECT * FROM images`
    }
    const result = await requestToDataBase(query).then(result => {
            console.log(`Records with ids ${ids} has obtainded - ${JSON.stringify(result)}`)
            return result
        }).catch(error => {
            console.error(error.message)
            throw error
        }
    )
    return result
}


const getImages = async(params) => {
    const obtainedImages = await selectImages(params.ids)
    return {
        result: 'successfull',
        objects: obtainedImages
    }
}

module.exports = getImages