const express = require("express");
const bodyParser = require('body-parser')
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
const createEvent = require('./routing/events/create-events')
const getEvents = require('./routing/events/get-events')
const deleteEvents = require('./routing/events/delete-events')
const createCompositions = require('./routing/compositions/create-compositions')
const getCompositions = require('./routing/compositions/get-compostions')
const deleteCompositions = require('./routing/compositions/delete-compositions')
const createMaterialInPassport = require('./routing/material-in-passport/create-material-in-passport')
const getMaterialsInPassports = require('./routing/material-in-passport/get-materials-in-passports')
const deleteMaterialsInPassports = require('./routing/material-in-passport/delete-materials-in-passport')
const createEventInPassport = require('./routing/events-in-passport/create-event-in-passport')
const getEventInPassport = require('./routing/events-in-passport/get-event-in-passport')
const deleteEventInPassport = require('./routing/events-in-passport/delete-event-in-passport')
const updateRestoreItem  = require('./routing/restore-Items/update-restore-item')
const updatePassport = require('./routing/passports/update-passport')
const createImagesInPassport = require('./routing/images/create-images')
const getImages = require('./routing/images/get-images')
const deleteImages = require('./routing/images/delete-images')
const formidable = require('express-formidable');
const createPlaceOfSave = require('./routing/place-of-save/create-place-of-save')
const getPlaceOfSave = require('./routing/place-of-save/get-place-of-save')
const deletePlaceOfSave = require('./routing/place-of-save/delete-place-of-save')
const createProtocol = require('./routing/protocol/create-protocol')
const createProtocols = require('./routing/protocol/create-protocol-passport')
const getProtocols = require('./routing/protocol/get-protocols')

const port = process.env.PORT || 3000
const token = process.env.TOKEN || 'root'

const app = express();
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

app.post('/api/v1/restore-item/update', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await updateRestoreItem(params).then(result => {
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

app.post('/api/v1/passports/update', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await updatePassport(params).then(result => {
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

app.post('/api/v1/placeofsave/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createPlaceOfSave(params).then(result => {
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

app.post('/api/v1/placeofsave/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getPlaceOfSave(params).then(result => {
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

app.post('/api/v1/placeofsave/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deletePlaceOfSave(params).then(result => {
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

app.post('/api/v1/events/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createEvent(params).then(result => {
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

app.post('/api/v1/events/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getEvents(params).then(result => {
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

app.post('/api/v1/events/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteEvents(params).then(result => {
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

app.post('/api/v1/compositions/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createCompositions(params).then(result => {
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

app.post('/api/v1/compositions/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getCompositions(params).then(result => {
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

app.post('/api/v1/compositions/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteCompositions(params).then(result => {
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

app.post('/api/v1/materials-passport/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createMaterialInPassport(params).then(result => {
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

app.post('/api/v1/materials-passport/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getMaterialsInPassports(params).then(result => {
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

app.post('/api/v1/materials-passport/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteMaterialsInPassports(params).then(result => {
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


app.post('/api/v1/events-passport/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createEventInPassport(params).then(result => {
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

app.post('/api/v1/events-passport/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getEventInPassport(params).then(result => {
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

app.post('/api/v1/events-passport/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteEventInPassport(params).then(result => {
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
app.post('/api/v1/protocols/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createProtocol(params).then(result => {
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
app.post('/api/v1/protocols/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getProtocols(params).then(result => {
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
app.post('/api/v1/protocols-passport/create', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await createProtocols(params).then(result => {
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

app.use(formidable({
    uploadDir: './uploads',
    keepExtensions: true
}))
app.post('/api/v1/images/create', async(request, response) => {
    try {
        const params = {
            fileName: request.files.uploadfile.path.split('\\')[1],
            passportId: request.query.passportId,
            comment: request.query.comment,
            workTime: request.query.workTime,
            date: request.query.date
        }
            await createImagesInPassport(params).then(result => {
                console.log(JSON.stringify(result))
                response.send(result)
            });
        
    }
    catch(ex){
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})

app.get('/api/v1/getImage', async(request, response) => {
    try {
        let fs = require('fs');
        let imageName = './uploads/' + request.query.imageName;
        const file = fs.readFileSync(imageName)
        response.header({'ContentType': 'image/png'})
        response.send(file)
    }
    catch(ex) {
        console.error(JSON.stringify(ex))
        response.send({ error: ex.toString()})
    }
})
app.post('/api/v1/images/get', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await getImages(params).then(result => {
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

app.post('/api/v1/images/delete', async(request, response) => {
    try {
        let params = request.body;
        if (!request.headers.token || request.headers.token !== token) {
            response.header('Content-Type', 'application/json');
            response.send(answerAccessDenied());
        }
        else {
            await deleteImages(params).then(result => {
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