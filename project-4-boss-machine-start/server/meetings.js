const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting
  } = require('./db');


//GET MEETINGS 

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');

    if(!allMeetings) {
        res.status(404)
    }

    res.send(allMeetings)
})

//POST MEETINGS

meetingsRouter.post('/', (req, res, next) => {
    
    const meetingsAdd = addToDatabase('meetings',createMeeting());

    if(!meetingsAdd){
        res.status(500)
    }

    res.status(201).send(meetingsAdd)
})

//DELETE MEETINGS

meetingsRouter.delete('/', (req, res, next) => {
    const deletedMeetings = deleteAllFromDatabase('meetings');

    if(!deletedMeetings){
        res.status(404)
    }

    res.send(deletedMeetings);
})