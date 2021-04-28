import express from 'express';
import { ticketService } from '../services/';
import { createResponse } from '../../utils/response';
import { validateInputParams } from '../../utils/requestValidator';

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
			return res.send(createResponse(false, 500, e));
		}
	};

	createTicketInternal = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['userId'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const ticket = await ticketService.createTicket(req.body.userId);
			const apiResponse = createResponse(ticket, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 500, e));
		}
	};

	participate = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['contestId', 'ticketId'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const { contestId, ticketId } = req.body;
			const userId = req.body.user._id;
			const mappingSuccess = await ticketService.redeemTicket(userId, ticketId, contestId);
			if (mappingSuccess) {
				return res.send(createResponse(true, 200));
			} else {
				return res.send(createResponse(false, 409, 'Contest has ended, or you have already participated'));
			}
		} catch (e) {
			return res.send(createResponse(false, 500, e));
		}
	};
}
