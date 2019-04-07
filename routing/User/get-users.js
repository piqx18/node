import requestToDataBase from '../../client-mysql/client-mysql';

const getUser = async (ids) => {
    console.log(`Try to get user info with ids - ${ids}`)
    const query = `SELECT * FROM USERS WHERE user_id in (${ids})`
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
    const query = `SELECT * FROM accounts WHERE user_id in (${ids})`
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
    const query = `SELECT * FROM rights WHERE user_id in (${ids})`
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
        // todo сделать формирование массива  [{
        //  userData: {},
        //  accountsData: {},
        //  rightsData: {}
        // }]
        // 
        // 
    }
    else {
        return invalidRequest()
    }
}

module.exports = getUsers