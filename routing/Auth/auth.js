const clientMySQL = require('../../client-mysql/client-mysql')
const mysql = require('mysql')

let requestToBase = async function(query) {
    return new Promise((resolve, reject) => {
        console.log(`try to query ${query}`)
        clientMySQL.query(query, function(error, result) {
                if (error) 
                {
                    reject(error)
                }
                console.log(`Successfull reqeust, response - ${JSON.stringify(result)}`)
                resolve(result)
        })  
    })
}

let queryCheckUser = (login) => {
    return `select * from users where login=` + mysql.escape(login)
}

let queryTakeRights = (userId) => {
     return 'select * from rights where user_id=' + mysql.escape(userId)
}

let answer = (user, rights) => {
    return {
        result: `successfull`,
        dataAuth: user[0], 
        ...{ token: 'root' },
        dataAccess: rights[0]
    }
}

let authoriazation = async function(data) {
    let login = data.login;
    let password = data.password;
    let query = queryCheckUser(login)
    let user = await requestToBase(query)

    if (user.length > 0) {
        if(user[0].password == password) {
            query = queryTakeRights(user[0].user_id)
            let rights = await requestToBase(query);
            return answer(user, rights)
        } 
    }
}

module.exports = authoriazation