import { Document, Model, model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { userJWTPrivateKey } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

UserSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id }, userJWTPrivateKey);
}
export const User: Model<IUser> = model('User', UserSchema);
