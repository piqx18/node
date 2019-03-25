const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const authorization = require('./routing/Auth/auth')
const answerAccessDenied = require('./response')
const createUser = require('./routing/User/create-user')
const deleteUser = require('./routing/User/delete-user')

const port = process.env.PORT || 3000
const token = process.env.TOKEN || 'root'

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
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            const result = await createUser(params).then( result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
            response.send(result)
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
});

app.post('/api/v1/user/deleteuser', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            const result = await deleteUser(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
            response.send(result)
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.listen(port);