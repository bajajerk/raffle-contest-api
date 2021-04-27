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
}
