import express from 'express';
import { userService } from '../services';

export class UserController {
	loginUser = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const user = await userService.loginUser(req.body.email);
			if(user){
				res.send({...user.toObject(), token: user.generateAuthToken()})
			}
			else {
				return res.status(401).send({message: "User Not Found"});
			}
		} catch (e) {
			return next(e);
		}
	};

	signUpUser = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const {email, lastName, firstName} = req.body;
			const user = await userService.createUser(email, firstName, lastName);
			if(user){
				res.send({...user.toObject(), token: user.generateAuthToken()})
			}
		} catch (e) {
			return next(e);
		}
	};
}
