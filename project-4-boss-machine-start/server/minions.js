const minionsRouter = require('express').Router();

module.exports = minionsRouter;

//app.use(bodyParser.json())

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } = require('./db.js');

//MIDDLEWARE

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion) {
        req.minion = minion;
        next();
    }else {
        res.status(404).send();
    }
})


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
    //const minionId = req.params.minionId
    const minion = req.minion

    if(!minion){
        return res.status(404).json({error: 'Minion not found'})
    }
    res.json(minion)
})

//PUT Minions

minionsRouter.put('/:minionId', (req, res, next) => {
    

    const minionUpdated = req.body;

    const updatedInstance = updateInstanceInDatabase('minions', minionUpdated)

    if (!updatedInstance){
        return res.status(404).json({error: 'Minion not found'})
    }

    res.send(updatedInstance)
})

//MINION DELETE
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId

    const minionDeleted = deleteFromDatabasebyId('minions', minionId);

    if(!minionDeleted) {
        return res.status(500)
    } else {
        res.status(204)
    }
    res.send();
})


//WORK ROUTES

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
  });

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);

    res.status(201).send(createdWork)
})


minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });


  minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });