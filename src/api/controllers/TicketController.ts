import express from 'express';
import { ticketService } from '../services/';
import { createResponse } from '../../utils/response';

export class TicketController {
	createTicket = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			const ticket = await ticketService.createTicket(req.body.user._id);
			const apiResponse = createResponse(ticket, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 400, e));
		}
	};

	participate = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			const { contestId, ticketId } = req.body;
			const userId = req.body.user._id;
			const mappingSuccess = await ticketService.redeemTicket(userId, ticketId, contestId);
			if (mappingSuccess) {
				return res.send(createResponse(true, 200));
			} else {
				return res.send(createResponse(false, 409, 'Contest has ended, or you have already participated'));
			}
		} catch (e) {
			return res.send(createResponse(false, 400, e));
		}
	};
}
