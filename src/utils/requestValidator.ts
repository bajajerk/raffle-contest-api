export const validateInputParams = (obj: object,params: string[]): boolean => {
	if (params.length === 0)
		return true;
	else {
		// @ts-ignore
		if (!obj[params[0]]) {
			return false;
		}
		params.shift();
		return validateInputParams(obj, params);
	}
};
