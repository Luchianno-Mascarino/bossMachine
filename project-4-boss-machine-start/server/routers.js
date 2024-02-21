const express = require('express')
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.json())

import {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  } from './db.js';



