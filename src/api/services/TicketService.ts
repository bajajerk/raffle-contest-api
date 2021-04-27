import { IRaffleTicket, RaffleTicket } from '../../models/RaffleTicket';
import { UserContestMapping } from '../../models/UserContestMapping';


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

	redeemTicket = async (userId: string, ticketId: string, contestId: string) => {
		try {
			if(await this.isTicketValid(ticketId) && await this.userAlreadyParticipatedInContest(userId, contestId)){
				await RaffleTicket.updateOne(
					{ id: ticketId },
					{ redeemed: true },
				);
				const userContestMapping = await UserContestMapping.create(
					{ userId: userId, ticketId: ticketId, contestId: contestId },
				);
				return true;
			}
			return false;
		} catch (e) {
			throw (e);
		}
	};

	isTicketValid = async (ticketId: string) => {
		const ticket = await RaffleTicket.findById(ticketId);
		return ticket && ticket.redeemed === false;
	};

	userAlreadyParticipatedInContest = async (userId: string, contestId: string) => {
		const mapping = await UserContestMapping.find({userId, contestId});
		return mapping.length === 0;
	}
}

