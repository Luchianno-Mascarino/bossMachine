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

})