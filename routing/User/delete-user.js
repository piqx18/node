const requestToDataBase = require('../../client-mysql/client-mysql')


const deleteRights = async(userIds) => {
    console.log(`Try to delete records from table Rights with id - ${userIds}`)
    const query = `DELETE FROM rights WHERE user_id in (${userIds})`
    await requestToDataBase(query)
    .then(
        result => {
            console.log(`Records with id ${userIds} purged - ${JSON.stringify(result)}`)
        }
    ).catch(
        error => {
            console.log(error.message)
            throw error
        }
    )
}

const deleteAccounts = async(userIds) => {
    console.log(`Try to delete records from table Accounts with id - ${userIds}`)
    const query = `DELETE FROM accounts WHERE user_id in (${userIds})`
    await requestToDataBase(query).then(
        result => {
            console.log(`Records with id ${userIds} purged - ${JSON.stringify(result)}`)
        }
    ).catch(
        error => {
            console.log(error.message)
            throw error
        }
    )
}

const deleteAuth = async(userIds) => {
    console.log(`Try to delete records from table Users with id - ${userIds}`)
    const query = `DELETE FROM users WHERE user_id in (${userIds})`
    await requestToDataBase(query).then(
        result => {
            console.log(`Records with id ${userIds} purged - ${JSON.stringify(result)}`)
        }
    ).catch(
        error => {
            console.log(error.message)
            throw error
        }
    )
}


const deleteUser = async(params) => {
    const ids = params.userIds;
    await deleteRights(ids);
    await deleteAccounts(ids);
    await deleteAuth(ids);
    return {
        result: 'successful',
        message: 'Users purged',
        ids
    }
}

module.exports = deleteUser