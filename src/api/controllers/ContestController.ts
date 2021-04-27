import express from 'express';
import { contestService } from '../services';

export class ContestController {
	createContest = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { prize, endDate } = req.body;
			const contest = await contestService.createContest(prize, new Date(endDate));
			res.send(contest);
		} catch (e) {
			return next(e);
		}
	};

	fetchLastWeekWinners = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const contest = await contestService.fetchWinnersOfLastWeek();
			res.send(contest);
		} catch (e) {
			return next(e);
		}
	};

	declareWinnerRandomly = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const contest = await contestService.declareWinnerRandomly(req.body.contestId);
			res.send(contest);
		} catch (e) {
			return next(e);
		}
	};
}
