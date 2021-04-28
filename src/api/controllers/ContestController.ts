import express from 'express';

import { contestService } from '../services';
import { createResponse } from '../../utils/response';

export class ContestController {
	createContest = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			const { prize, endDate } = req.body;
			const contest = await contestService.createContest(prize, new Date(endDate));
			const apiResponse = createResponse(contest, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 400, e));
		}
	};

	fetchLastWeekWinners = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			const contest = await contestService.fetchWinnersOfLastWeek();
			const apiResponse = createResponse(contest, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 400, e));
		}
	};

	declareWinnerRandomly = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			const contest = await contestService.declareWinnerRandomly(req.body.contestId);
			const apiResponse = createResponse(contest, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 400, e));
		}
	};
}
