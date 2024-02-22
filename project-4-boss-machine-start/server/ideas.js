const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');


const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideasId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.ideasId = idea;
        next();
    } else {
        res.status(404).send();
    }
})


ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')

    if(ideas !== null){
        res.json(ideas)
    }else{
        res.status(404).send('Not found ideas')
    }
})

//POST IDEAS

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const ideasData = req.body;
    //String to int to be added to the DB correctly
    ideasData.numWeeks = parseInt(ideasData.numWeeks)
    ideasData.weeklyRevenue = parseInt(ideasData.weeklyRevenue)

    const newIdea = addToDatabase('ideas', ideasData);

    if(!newIdea){
        return res.status(500)
    }
    res.status(201).send(newIdea)
})

//get single ID

ideasRouter.get('/:ideald', (req, res, next) => {
    const ideaId = req.ideaId
 

    if (!ideaId) {
        return res.status(404).json({error: 'Not found'})
    }
    res.send(ideaId)

})

//PUT Idea

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const ideaUpdate = req.body;
    
    
    //Pasamos los datos de string a INT para que se guarden correctamente en la
    //ideaUpdate.numWeeks = parseInt(ideaUpdate.numWeeks);
    //ideaUpdate.weeklyRevenue = parseInt(ideaUpdate.weeklyRevenue);

    const ideaUpdated = updateInstanceInDatabase('ideas', ideaUpdate)

    if(!ideaUpdated){
        return res.status(404)
    }

    res.send(ideaUpdated)
})

//DELETE IDEA

ideasRouter.delete('/:ideaId', (req, res, next) =>{
    const ideaId = req.params.ideaId

    const ideaDeleted = deleteFromDatabasebyId('ideas', ideaId);

    if(!ideaDeleted){
        return res.status(500)
    }

    res.status(204).send()
})
