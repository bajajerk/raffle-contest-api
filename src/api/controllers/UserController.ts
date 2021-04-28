import express from 'express';

import { userService } from '../services';
import { createResponse } from '../../utils/response';
import { validateInputParams } from '../../utils/requestValidator';

export class UserController {
	loginUser = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['email'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const user = await userService.loginUser(req.body.email);
			if (user) {
				const apiResponse = createResponse({ ...user.toObject(), token: user.generateAuthToken() }, 200);
				return res.send(apiResponse);
			} else {
				const apiResponse = createResponse(false, 401, 'User Not Found');
				return res.send(apiResponse);
			}
		} catch (e) {
			return res.send(createResponse(false, 500, e));
		}
	};

	signUpUser = async (
		req: express.Request,
		res: express.Response,
	) => {
		try {
			if (!validateInputParams(req.body, ['email', 'firstName', 'lastName'])) {
				return res.send(createResponse(false, 400, 'Some params missing'));
			}

			const { email, lastName, firstName } = req.body;
			const user = await userService.createUser(email, firstName, lastName);
			if (user) {
				const apiResponse = createResponse({ ...user.toObject(), token: user.generateAuthToken() }, 200);
				return res.send(apiResponse);
			} else {
				const apiResponse = createResponse(false, 401, 'User Already exits');
				return res.send(apiResponse);
			}
		} catch (e) {
			return res.send(createResponse(false, 500, e));
		}
	};
}
