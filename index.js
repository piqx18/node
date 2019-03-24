const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const authorization = require('./routing/Auth/auth')
const answerAccessDenied = require('./response')

const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/api/v1/user/authorization', async(request, response) => {
    try {
        let params = request.body;
        let result = await authorization(params);
        console.log(result)
        response.header('Content-Type', 'application/json');
        response.send(result)
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }  
});

app.post('/api/v1/user/createuser', async(request, response) => {
    try {
        let params = request.body;
        if (request.body.header.token !== 'root') {
            answerAccessDenied();
        }
        else {

        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
});

app.listen(port);