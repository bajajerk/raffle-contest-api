import moment from 'moment';

import { WinningPrize } from '../../utils/constants';
import { Contest, IContest } from '../../models/Contest';
import { UserContestMapping } from '../../models/UserContestMapping';
import { renameKey } from '../../utils/objectManipulators';

export class ContestService {
	createContest = async (prize: WinningPrize, endDate: Date) => {
		try {
			const contest: IContest = await Contest.create({ prize, endDate });
			return contest;
		} catch (e) {
			throw e;
		}
	};

	fetchWinnersOfLastWeek = async () => {
		try {
			const filter = {
				endDate: {
					$gte: new Date(moment(new Date()).subtract(7, 'day').toISOString()),
				},
				winnerId: { $ne: null },
			};
			// @ts-ignore
			const contestWithJoin: IContest[] = await Contest.find(filter).populate('winnerId' as 'winner');
			return contestWithJoin.map(c => {
				return renameKey(c.toObject(), 'winnerId', 'winner');
			});
		} catch (e) {
			console.log(e)
			throw e;
		}
	};

	declareWinnerRandomly = async (contestId: string) => {
		try {
			const fetchWinnerIfDeclared = await this.getWinnerForContest(contestId);
			if (fetchWinnerIfDeclared) {
				return fetchWinnerIfDeclared;
			}
			const usersParticipatingInContest: any[] = await UserContestMapping.find({ contestId }, { userId: 1, _id: 0 });
			if (usersParticipatingInContest.length === 0) {
				return null;
			}
			const winnerUserId = usersParticipatingInContest[Math.floor(Math.random() * (usersParticipatingInContest.length))].userId;
			await Contest.findByIdAndUpdate(contestId, { winnerId: winnerUserId });
			return winnerUserId;
		} catch (e) {
			throw e;
		}
	};

	getWinnerForContest = async (contestId: string) => {
		try {
			const contest: IContest | null = await Contest.findById(contestId, { winnerId: 1 });
			if (contest) {
				return contest.winnerId;
			}
			return contest;
		} catch (e) {
			throw e;
		}
	};

	isContestActive = async (contestId: string) => {
		try {
			const contest: IContest | null = await Contest.findById(contestId);
			return contest && contest.endDate.getTime() > new Date().getTime() * 1000;
		} catch (e) {
			throw e;
		}
	};
}
