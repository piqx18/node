const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const authorization = require('./routing/Auth/auth')

app.use(bodyParser.json());

app.post('/api/v1/user/authorization', async(request, response) => {
    try {
        let params = request.body;
        let result = await authorization(params);
        console.log(result)
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


let answerAccessDenied = () => {
    return {
        result: 'error',
        message: 'ACCESS DENIED'
    }
}


app.listen(3000);