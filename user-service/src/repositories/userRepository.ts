import User, { IUser } from '../models/user';

interface CreateUserInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}

const findUserByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username });
};

const findUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};

const createUser = async (userData: CreateUserInput): Promise<IUser> => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

const deleteUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(userId);
};

export const userRepository = {
  findUserByUsername,
  findUserById,
  createUser,
  deleteUserById,
};
