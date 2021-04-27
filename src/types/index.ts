import express from "express";

export interface AuthenticatedRequest {
	req: express.Request,
	user: {
		_id: string,
	}
}
