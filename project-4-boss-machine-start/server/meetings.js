const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');


//GET MEETINGS 

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');

    if(!allMeetings) {
        res.status(404).json({error: 'not found'})
    }

    res.send(allMeetings)
})

//POST MEETINGS

meetingsRouter.post('/', (req, res, next) => {
    
    const meetingsAdd = createMeeting()

    if(!meetingsAdd){
        res.status(500).json({error: 'Cannot add'})
    }

    res.status(201).json(meetingsAdd)
})

//DELETE MEETINGS

meetingsRouter.delete('/', (req, res, next) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');

    if(!deletedMeetings){
        res.status(404).json({error: 'Not found'})
    }

    res.send(deletedMeetings);
})