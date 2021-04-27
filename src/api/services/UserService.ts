import { IUser, User } from '../../models/User';

export class UserService{
  createUser = async (email: string, firstName: string, lastName: string) => {
		const newUser: IUser =  await User.create({ email, firstName, lastName });
		return newUser
  }

	loginUser = async (email: string) => {
		// @ts-ignore
		const user: IUser =  await User.findOne({
			email
		});
		return user;
	}
}
