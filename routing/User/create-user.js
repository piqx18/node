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
    console.log(`Try to create record in table Users with data - ${JSON.stringify(dataUser)}`)
    let query = `Insert INTO users(login, password) VALUES('${dataUser.login}', '${dataUser.password}')`
    const record = await requestToDataBase(query).then(
        result => {
            console.log(`Create record in Users with id - ${(result.insertId)}`)
            return result.insertId
        }
    ).catch(error => {
        console.log(`Error - ${error.message}`)
    })
    return record;
}

const insertAccounts = async(dataUser, id) => {
    console.log(`Try to create record in table Accounts with data - ${JSON.stringify(dataUser)}`);
    const query = `INSERT INTO accounts(user_id, surname, name, patronymic, post, email, image) VALUES (" \
    "'${id}','${dataUser.surname}', '${dataUser.name}','${dataUser.patronymic}','${dataUser.post}','${dataUser.email}','${dataUser.images}')`
    await requestToDataBase(query).then(
        result => {
            console.log(`Create record in Accounts with id - ${result.insertId}`)
        }
    ).catch(error => {
        console.log(`Error - ${error.message}`)
    })
}

const insertRights = async(dataAccess, userId) => {
    console.log(`Try to create record in table Rights with data - ${JSON.stringify(dataAccess)}`);
    const query = `INSERT INTO rights(user_id, confirmed, allow_read, allow_write, allow_partial_edit, allow_edit, \
    allow_manage, allow_print, blocked) VALUES ( '${userId}', '${+dataAccess.confirmed}', \
     '${+dataAccess.allowRead}', '${+dataAccess.allowWrite}', '${+dataAccess.allowPartialEdit}', '${+dataAccess.allowEdit}', '${+dataAccess.allowManage}', \
    '${+dataAccess.allowPrint}', \
    '${+dataAccess.blocked}')`
    await requestToDataBase(query).then(
        result => {
            console.log(`Create record in Rights with id - ${result.insertId}`)
        }
    ).catch(error => {
        console.log(`Error - ${error.message}`)
    })
}

const userIsExist = (user) => {
    return {
        result: 'error',
        message: 'USER EXIST',
        dataAuth: user[0]
    }
}

const createUser = async(data) => {
    let dataAuth = data.dataAuth;
    let dataUser = data.dataUser;
    let dataAccess = data.dataAccess;
    const existUser = await checkUser(dataAuth);
    if (existUser.length > 0) {
        return userIsExist(existUser)
    }
    else if(existUser.length === 0) {
        const idUser = await insertUser(dataAuth);
        await insertAccounts(dataUser, idUser)
        await insertRights(dataAccess, idUser)
        return {
            result: "successful",
            message: 'UserCreated',
            idUser
        }
    }
}

module.exports = createUser