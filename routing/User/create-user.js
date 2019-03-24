const requestToDataBase = require('../../client-mysql/client-mysql')
const mysql = require('mysql')

checkUser = async(dataAuth) => {

    let query = 'Select * from users where login=' + mysql.escape(dataAuth.login);
    return await requestToDataBase(query);
}



createuser = async(data) => {
    let dataAuth = data.dataAuth;
    let dataAccess = data.Access;
    let dataUser = data.dataUser;

    const existUser = await checkUser(dataAuth);

    if (existUser.lenght > 0) {
        
    }
}