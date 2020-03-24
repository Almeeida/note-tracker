const { Router } = require('express');

const UserController = require('./controllers/UserController');
const NoteController = require('./controllers/NoteController');

const routes = Router();

routes.get('/users', UserController.index)
routes.post('/users', UserController.create);

routes.get('/notes', NoteController.index);
routes.post('/notes', NoteController.create);
routes.delete('/notes/:id', NoteController.delete);

module.exports = routes;
