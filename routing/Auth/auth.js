const requestToDataBase = require('../../client-mysql/client-mysql')
const mysql = require('mysql')

let queryCheckUser = (login) => {
    return `select * from users where login=` + mysql.escape(login)
}

let queryTakeRights = (userId) => {
     return 'select * from rights where user_id=' + mysql.escape(userId)
}

let queryTakeAccounts = (userId) => {
    return 'select * from accounts where user_id=' + mysql.escape(userId)
}

let answerSuccesfull = (user, rights, account) => {
    return {
        result: `successfull`,
        dataAuth: user[0], 
        token: 'root',
        dataAccess: rights[0],
        dataAccount: account[0]
        // todo надо ли править 1 -> true
    }
}

let answerAccessDenied = (user) => {
    return {
        result: 'error',
        message: 'ACCESS DENIED',
        dataAuth: user[0]
    }
}

let answerNotFound = (user) => {
    return {
        result: 'error',
        message: 'NOT FOUND'
    }
}

let authoriazation = async(data) => {
    let login = data.login;
    let password = data.password;
    let query = queryCheckUser(login)
    let user = await requestToDataBase(query)

    if (user.length > 0 && user[0].password === password) {
        query = queryTakeRights(user[0].user_id)
        let rights = await requestToDataBase(query);
        query = queryTakeAccounts(user[0].user_id)
        let account = await requestToDataBase(query)
        return answerSuccesfull(user, rights, account) 
    }
    else if(user.length === 0) {
        return answerNotFound(user)
    }
    else if(user.length > 0 && user[0].password !== password) {
        return answerAccessDenied(user)
    }
}

module.exports = authoriazation