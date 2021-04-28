import express from 'express';

import { contestController, ticketController, userController } from '../controllers';

const auth = require('../middleware/auth');

module.exports = (app: express.Application) => {
	app.get('/', (req, res) =>
		res.send('Welcome To Raffle API'),
	);
	app.put('/api/user/login', userController.loginUser);
	app.post('/api/user/signup', userController.signUpUser);
	app.post('/api/ticket', auth, ticketController.createTicket);
	app.post('/api/ticket/internal', ticketController.createTicketInternal);
	app.post('/api/contest', contestController.createContest);
	app.put('/api/contest/participate', auth, ticketController.participate);
	app.get('/api/contest/lastWeekWinners', auth, contestController.fetchLastWeekWinners);
	app.put('/api/contest/declareWinnerRandomly', contestController.declareWinnerRandomly);
};
