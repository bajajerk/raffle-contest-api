import express from 'express';

import { contestController, ticketController, userController } from '../controllers';
const auth = require('../middleware/auth');

module.exports = (app: express.Application) => {
  app.get('/', (req, res) =>
    res.send('PLEASE dont play with the api bro, thanks'),
  );
	app.post('/user/login', userController.loginUser);
	app.post('/user/signup', userController.signUpUser);
	app.get('/createTicket', auth, ticketController.createTicket);
  app.get('/createContest', contestController.createContest);
};
