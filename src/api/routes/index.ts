import express from 'express';

import { contestController, ticketController, userController } from '../controllers';

const auth = require('../middleware/auth');

module.exports = (app: express.Application) => {
	app.get('/', (req, res) =>
		res.send('Welcome To Raffle API'),
	);
	app.post('/user/login', userController.loginUser);
	app.post('/user/signup', userController.signUpUser);
	app.post('/createTicket', auth, ticketController.createTicket);
	app.post('/createContest', contestController.createContest);
	app.put('/participateContest', auth, ticketController.participate);
	app.get('/lastWeekWinners', auth, contestController.fetchLastWeekWinners);
	app.get('/declareWinnerRandomly', contestController.declareWinnerRandomly);
};
