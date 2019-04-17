const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const authorization = require('./routing/Auth/auth')
const answerAccessDenied = require('./response')
const createUser = require('./routing/User/create-user')
const deleteUser = require('./routing/User/delete-user')
const getUsers = require('./routing/User/get-users')
const createCollection = require('./routing/collections/create-collections').createCollection
const deleteCollections = require('./routing/collections/delete-collections')
const getCollections = require('./routing/collections/get-collections')
const createTypeMonument = require('./routing/types-monument/create-type-monument').createTypeMonument
const getTypesMonuments = require('./routing/types-monument/get-type-monument')
const deleteTypesMonuments = require('./routing/types-monument/delete-monument')
const createRestoreItem = require('./routing/restore-Items/create-restore-items')
const getRestoreItems = require('./routing/restore-Items/get-restore-item')
const deleteRestoreItems = require('./routing/restore-Items/delete-restore-item')
const createPassport = require('./routing/passports/create-passport')
const getPassports = require('./routing/passports/get-passports')
const deletePassports = require('./routing/passports/delete-passports')
const createLabResearch = require('./routing/lab-research/create-lab-research')
const getLabResearch = require('./routing/lab-research/get-lab-research')
const deleteLabResearch = require('./routing/lab-research/delete-lab-research')
const createMaterials = require('./routing/materials/create-material')
const getMaterials = require('./routing/materials/get-materials')
const deleteMaterials = require('./routing/materials/delete-materials')

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
            await createUser(params).then( result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
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
            await deleteUser(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/user/getusers', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getUsers(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/collections/createcollection', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createCollection(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})


app.post('/api/v1/collections/deletecollections', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteCollections(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/collections/getcollections', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getCollections(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/typesmonument/createtypemonument', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createTypeMonument(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/typesmonument/gettypemonument', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getTypesMonuments(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/typesmonument/deletetypemonument', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteTypesMonuments(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/restore-item/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createRestoreItem(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/restore-item/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getRestoreItems(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/restore-item/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteRestoreItems(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/passports/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createPassport(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/passports/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getPassports(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/passports/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deletePassports(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/lab-research/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createLabResearch(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/lab-research/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getLabResearch(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/lab-research/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteLabResearch(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/materials/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createMaterials(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/materials/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getMaterials(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.post('/api/v1/materials/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteMaterials(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        }
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.listen(port);