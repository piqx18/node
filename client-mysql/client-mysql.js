const mysql =  require('mysql');

let clientMySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer",
  database: "museum"
});

let requestToDataBase = async (query) => {
    return new Promise((resolve, reject) => {
        console.log(`try to query ${query}`)
        clientMySQL.query(query, function(error, result) {
                if (error) 
                {
                    reject(error)
                }
                console.log(`Successfull insert, response - ${JSON.stringify(result)}`)
                resolve(result)
        })  
    })
}

module.exports = requestToDataBase