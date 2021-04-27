import { IUser, User } from '../../models/User';

module.exports = {
  createUser: async (email: string, firstName: string, lastName: string) => {
    const user: IUser = await User.create({ email, firstName, lastName });
    return user;
  },
};
