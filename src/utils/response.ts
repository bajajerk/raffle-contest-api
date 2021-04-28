export const createResponse =
	(
		data: any,
		statusCode: number,
		error: any = false,
	) => {
		if (!error) error = {};
		if (!data) data = {};
		let message = '';
		switch (statusCode) {
			case 200:
				message = 'ok';
				break;
			case 201:
				message = 'created';
				break;
			case 400:
				message = 'Bad Request';
				break;
			case 401:
				message = 'unauthorized';
				break;
			case 404:
				message = 'not found';
				break;
			case 409:
				message = 'conflict';
				break;
			case 422:
				message = 'unprocessable entity';
				break;
			case 500:
				message = 'internal server error';
				break;
			default:
				message = 'internal server error';
		}
		return {
			data,
			statusCode,
			message,
			error,
		};
	};
