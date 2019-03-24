const requestToDataBase = require('../../client-mysql/client-mysql')
const mysql = require('mysql')

const checkUser = async(dataAuth) => {
    console.log(`Try to get user with data - ${JSON.stringify(dataAuth)}`);
    let query = 'Select * from users where login=' + mysql.escape(dataAuth.login);
    const result = await requestToDataBase(query).then( result=> {
        console.log(`Obtained record - ${JSON.stringify(result)}`)
        return result
    })
    return result
}

const insertUser = async(dataUser) => {
    console.log(`Try to create record in Users with data - ${JSON.stringify(dataUser)}`)
    let query = `Insert INTO users(login, password) VALUES('${dataUser.login}', '${dataUser.password}')`
    const record = await requestToDataBase(query).then(
        result => {
            console.log(`Create record in Users with id - ${(result.insertId)}`)
            return result.insertId
        }
    )
    return record;
}

const insertAccounts = async(dataUser, id) => {
    console.log(`Try to create record in accounts with data - ${JSON.stringify(dataUser)}`);
    const query = `INSERT INTO accounts(user_id, surname, name, patronymic, post, email, image) VALUES (" \
    "'${id}','${dataUser.surname}', '${dataUser.name}','${dataUser.patronymic}','${dataUser.post}','${dataUser.email}','${dataUser.images}')`
    await requestToDataBase(query).then(
        result => {
            console.log(`Create record in Accounts with id - ${result.insertId}`)
        }
    )
}

const insertRights = async(dataAccess) => {

}

const userIsExist = (user) => {
    return {
        result: 'error',
        message: 'USER EXIST',
        dataAuth: user[0]
    }
}

createUser = async(data) => {
    let dataAuth = data.dataAuth;
    let dataUser = data.dataUser;
    // let dataUser = data.dataUser;
    const existUser = await checkUser(dataAuth);
    if (existUser.length > 0) {
        return userIsExist(existUser)
    }
    else if(existUser.length === 0) {
        const idUser = await insertUser(dataAuth);
        await insertAccounts(dataUser, idUser)
        return {} 
    }
}

module.exports = createUser