const mysql =  require('mysql');

const host = process.env.HOST_DB || 'localhost';
const user = process.env.USER_DB || 'root';
const password = process.env.USER_PASSWORD_DB || 'qwer'
const database = process.env.DATABASE || 'museum'

let clientMySQL = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

let requestToDataBase = async (query) => {
    return new Promise((resolve, reject) => {
        console.log(`Try to query DB ${query}`)
        clientMySQL.query(query, function(error, result) {
                if (error) 
                {
                    reject(error)
                }
                console.log(`Successfull, response - ${JSON.stringify(result)}`)
                resolve(result)
        })  
    })
}

module.exports = requestToDataBase