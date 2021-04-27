import { IRaffleTicket, RaffleTicket } from '../../models/RaffleTicket';


export class TicketService {
	createTicket = async (userId: string) => {
		try {
			const ticket: IRaffleTicket = await RaffleTicket.create({
				userId,
				uniqueCode: Math.ceil(new Date().getTime()).toString(36),
			});
			return ticket;
		} catch (e) {
			throw (e);
		}
	};
}

