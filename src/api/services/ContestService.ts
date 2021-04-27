import { IUser, User } from '../../models/User';
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

}
