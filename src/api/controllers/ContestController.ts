import express from 'express';

import { contestService } from '../services';
import { createResponse } from '../../utils/response';
import { validateInputParams } from '../../utils/requestValidator';

export class ContestController {
	createContest = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['prize', 'endDate'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const { prize, endDate } = req.body;
			const contest = await contestService.createContest(prize, new Date(endDate));
			const apiResponse = createResponse(contest, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 500, e));
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
			return res.send(createResponse(false, 500, e));
		}
	};

	declareWinnerRandomly = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['contestId'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const contest = await contestService.declareWinnerRandomly(req.body.contestId);
			const apiResponse = createResponse(contest, 200);
			return res.send(apiResponse);
		} catch (e) {
			return res.send(createResponse(false, 500, e));
		}
	};
}
