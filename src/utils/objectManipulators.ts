export const renameKey = (object: object, key: string, newKey: string) => {
	const clonedObj = clone(object);
	const targetKey = clonedObj[key];
	delete clonedObj[key];
	clonedObj[newKey] = targetKey;
	return clonedObj;
};

export const clone = (obj: object): { [key: string]: string } => Object.assign({}, obj);
