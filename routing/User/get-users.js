const requestToDataBase = require('../../client-mysql/client-mysql')

const getUser = async (ids) => {
    console.log(`Try to get user info with ids - ${ids}`)
    let query = ''
    if (ids.length > 0) {
        query = `SELECT * FROM USERS WHERE user_id in (${ids})`
    } 
    else {
        query = `SELECT * FROM USERS`
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

const getAccounts = async(ids) => {
    console.log(`Try to get user personal data with ids - ${ids}`)
    let query = ''
    if (ids.length > 0){
        query = `SELECT * FROM accounts WHERE user_id in (${ids})`
    }
    else {
        query = 'SELECT * FROM accounts'
    }
    const result = await requestToDataBase(query)
    .then(
        result => {
            console.log(`Records with ids ${ids} obtainded - ${JSON.stringify(result)}`)
            return result
        }
    ).catch(
        error => {
            console.error(error.message)
            throw error
    })
    return result
}

const getRights = async(ids) => {
    console.log(`Try to get user rights data with ids - ${ids}`)
    query = ''
    if (ids.length > 0) {
        query = `SELECT * FROM rights WHERE user_id in (${ids})`    
    }
    else {
        query = 'SELECT * FROM rights'
    }
    const result = await requestToDataBase(query)
    .then(
        result => {
            console.log(`Records with ids ${ids} obtainded - ${JSON.stringify(result)}`)
            return result
        }
    ).catch(
        error => {
            console.error(error.message)
            throw error
    })
    return result
}

const invalidRequest = () => {
    return {
        result: 'error',
        message: 'Must contains ids'
    }
}

const getUsers = async (params) => {
    if (params.ids) {
        const userData = await getUser(params.ids)
        const accountsData = await getAccounts(params.ids)
        const rightsData = await getRights(params.ids)
        let users = []
        const lenghtUsers = userData.length
        for (let i=0; i< lenghtUsers; i++) {
            users.push(
                {
                    userData,
                    accountsData,
                    rightsData
                }
            )
        }
        return users
    }
    else {
        return invalidRequest()
    }
}

module.exports = getUsers