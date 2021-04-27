import express from 'express';
import jwt from 'jsonwebtoken';
import { userJWTPrivateKey } from '../../utils/constants';

module.exports = function(req: express.Request, res: express.Response, next: express.NextFunction) {
	const token = req.header("auth_token");
	if (!token) return res.status(401).send("Access denied. No token provided.");

	try {
		req.body.user = jwt.verify(token, userJWTPrivateKey);
		next();
	} catch (ex) {
		res.status(400).send("Invalid token.");
	}
};
