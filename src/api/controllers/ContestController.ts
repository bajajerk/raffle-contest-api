import express from 'express';
import { Contest, IContest } from '../../models/Contest';
import { WinningPrize } from '../../utils/constants';

export class ContestController {
  createContest = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const contest: IContest = await Contest.create({
        prize: WinningPrize.CAR,
        endDate: new Date(),
      });
      res.send(contest);
    } catch (e) {
      return next(e);
    }
  };
}
