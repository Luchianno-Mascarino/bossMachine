const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');


ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')

    if(ideas !== null){
        res.json(ideas)
    }else{
        res.status(404).send('Not found ideas')
    }
})

//POST IDEAS

ideasRouter.post('/', (req, res, next) => {
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

ideasRouter.get('/:ideald', (req, res, next) => {
    const ideaData = req.params.ideaId
    const ideaId = getFromDatabaseById('ideas', ideaData)

    if (!ideaId) {
        return res.status(404).json({error: 'Not found'})
    }
    res.json(ideaId)

})

//PUT Idea

ideasRouter.put('/:ideaId', (req, res, next) => {
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

ideasRouter.delete('/:ideaId', (req, res, next) =>{
    const ideaId = req.params.ideaId

    const ideaDeleted = deleteFromDatabasebyId('ideas', ideaId);

    if(!ideaDeleted){
        return res.status(404).json({error: 'Not found'})
    }

    res.status(204).send()
})
