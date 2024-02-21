const minionsRouter = require('express').Router();

module.exports = minionsRouter;

//app.use(bodyParser.json())

import {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } from './db.js';


//GET ALL minions
minionsRouter.get('/', (req, res, next) =>{
    const minions = getAllFromDatabase('minions')
    res.send(minions)
})

// Crear nuevo Minion

minionsRouter.post('/', (req, res, next) => {
    //console.log(req.body);
    const minionData = req.body
    const newMinion = addToDatabase('minions', minionData)
    if(newMinion === null) {
        return res.status(500).json({error: 'Error al agregar el minion a la base de datos'})
    }

    res.status(201).send(newMinion);
})

// GET un solo minion

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minion = getFromDatabaseById('minions', minionId)

    if(!minion){
        return res.status(404).json({error: 'Minion not found'})
    }
    res.json(minion)
})

//PUT Minions

minionsRouter.put('/:minionsId', (req, res, next) => {
    const minionId = req.params.minionId

    const minionUpdated = req.body;

    const updatedInstance = updateInstanceInDatabase('minions', {...minionUpdated, id: minionId})

    if (!updatedInstance){
        return res.status(404).json({error: 'Minion not found'})
    }

    res.json(updatedInstance)
})

//MINION DELETE
minionsRouter.delete('/:minionsId', (req, res, next) => {
    const minionId = req.params.minionId

    const minionDeleted = deleteFromDatabasebyId('minions', minionId);

    if(!minionDeleted) {
        return res.status(404).json({error: 'Minion not found'})
    }
    res.status(204).send();
})