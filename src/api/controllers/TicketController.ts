import express from 'express';
import {ticketService} from '../services/';

export class TicketController {
	createTicket = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const ticket = await ticketService.createTicket(req.body.user._id);
			res.send(ticket);
		} catch (e) {
			return next(e);
		}
	};

	participate = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { contestId, ticketId } = req.body;
			const userId = req.body.user._id;
			const mappingSuccess = await ticketService.redeemTicket(userId, ticketId, contestId);
			res.send(mappingSuccess);
		} catch (e) {
			return next(e);
		}
	}
}
