const express = require('express')
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.json())

import {
    db,
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } from './db.js';


//GET ALL minions
app.get('/api/minions', (req, res, next) =>{
    const minions = getAllFromDatabase('minions')
    if(minions !== null){
        res.json(minions)
    } else {
        res.status(404).send('Minions not found')
    }
    
})

// Crear nuevo Minion

app.post('/api/minions', (req, res, next) => {
    //console.log(req.body);
    const minionData = req.body
    const newMinion = addToDatabase('minions', minionData)
    if(newMinion === null) {
        return res.status(500).json({error: 'Error al agregar el minion a la base de datos'})
    }

    res.status(201).json(newMinion);
})

// GET un solo minion

app.get('/api/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minion = getFromDatabaseById('minions', minionId)

    if(!minion){
        return res.status(404).json({error: 'Minion not found'})
    }
    res.json(minion)
})

//PUT Minions

app.put('/api/minions/:minionsId', (req, res, next) => {
    const minionId = req.params.minionId

    const minionUpdated = req.body;

    const updatedInstance = updateInstanceInDatabase('minions', {...minionUpdated, id: minionId})

    if (!updatedInstance){
        return res.status(404).json({error: 'Minion not found'})
    }

    res.json(updatedInstance)
})

//MINION DELETE
app.delete('/api/minions/:minionsId', (req, res, next) => {
    const minionId = req.params.minionId

    const minionDeleted = deleteFromDatabasebyId('minions', minionId);

    if(!minionDeleted) {
        return res.status(404).json({error: 'Minion not found'})
    }
    res.status(204).send();
})

//API IDEAS
//GET IDEAS

app.get('/api/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')

    if(ideas !== null){
        res.json(ideas)
    }else{
        res.status(404).send('Not found ideas')
    }
})

//POST IDEAS

app.post('/api/ideas', (req, res, next) => {
    const ideasData = req.body;
    //String to int to be added to the DB correctly
    ideasData.numWeeks = parseInt(ideasData.numWeeks)
    ideasData.weeklyRevenue = parseInt(ideasData.weeklyRevenue)

    const newIdea = addToDatabase('ideas', ideasData);

    if(!newIdea){
        return res.status(500).json({error : 'No se pudo agregar'})
    }
    res.status(201).json(newIdea)
})

//get single ID

app.get('/api/ideas/:ideald', (req, res, next) => {
    const ideaData = req.params.ideaId
    const ideaId = getFromDatabaseById('ideas', ideaData)

    if (!ideaId) {
        return res.status(404).json({error: 'Not found'})
    }
    res.json(ideaId)

})

//PUT Idea

app.put('/api/ideas/:ideaId', (req, res, next) => {
    const ideaUpdate = req.body;
    const ideaId = req.params.ideaId;
    
    //Pasamos los datos de string a INT para que se guarden correctamente en la
    ideaUpdate.numWeeks = parseInt(ideaUpdate.numWeeks);
    ideaUpdate.weeklyRevenue = parseInt(ideaUpdate.weeklyRevenue);

    const ideaUpdated = updateInstanceInDatabase('ideas', {...ideaUpdate, id: ideaId})

    if(!ideaUpdated){
        return res.status(404).json({error: 'Error'})
    }

    res.json(ideaUpdated)
})

//DELETE IDEA

app.delete('/api/ideas/:ideaId', (req, res, next) =>{
    const ideaId = req.params.ideaId

    const ideaDeleted = deleteFromDatabasebyId('ideas', ideaId);

    if(!ideaDeleted){
        return res.status(404).json({error: 'Not found'})
    }

    res.status(204).send()
})

//GET MEETINGS 

app.get('/api/meetings', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');

    if(!allMeetings) {
        res.status(404).json({error: 'not found'})
    }

    res.send(allMeetings)
})

//POST MEETINGS

app.post('/api/meetings', (req, res, next) => {
    
    const meetingsAdd = createMeeting()

    if(!meetingsAdd){
        res.status(500).json({error: 'Cannot add'})
    }

    res.status(201).json(meetingsAdd)
})

//DELETE MEETINGS

app.delete('/api/meetings', (req, res, next) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');

    if(!deletedMeetings){
        res.status(404).json({error: 'Not found'})
    }

    res.send(deletedMeetings);
})