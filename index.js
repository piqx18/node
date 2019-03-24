const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const authorization = require('./routing/Auth/auth')

app.use(bodyParser.json());

app.post("/api/v1/user/authorization", async function(request, response){
    try{
        let params = request.body;
        let result = await authorization(params);
        console.log(result)
        response.send(result)
    }
    catch(ex){
        console.error(ex)
        response.send({ error: ex.toString()})
    }  
   });

app.listen(3000);