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
    
    res.json(getAllFromDatabase('minions'))
})

// Crear nuevo Minion

app.post('/api/minions', (req, res, next) => {
    console.log(req.body);
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
    const minionUpdate = updateInstanceInDatabase('minions', minionId);

    
})
