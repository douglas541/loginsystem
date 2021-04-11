const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const AppController = require('./controllers/AppController');
const authMiddleware = require('./middlewares/auth');

routes.get('/users', UserController.index);
routes.post('/register', UserController.userRegister);
routes.post('/authenticate', UserController.userAuth);

// routes.use(authMiddleware);
routes.get('/authverify', authMiddleware, AppController.default);

module.exports = routes;