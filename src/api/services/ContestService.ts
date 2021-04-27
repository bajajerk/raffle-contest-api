import moment from 'moment';

import { WinningPrize } from '../../utils/constants';
import { Contest, IContest } from '../../models/Contest';

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
			const contest: IContest[] = await Contest.find(filter).populate('winnerId');
			return contest;
		} catch (e) {
			throw e;
		}
	};

}
