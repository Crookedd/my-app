import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import { IUser } from '../models/user';

const register = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  role: string,
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    role,
  });
  return newUser;
};

const login = async (username: string, password: string): Promise<IUser> => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('Неверные данные');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Неверные данные');
  }

  return user;
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

const getUserById = async (userId: string) => {
  return await userRepository.findUserById(userId);
};

const deleteUser = async (userId: string) => {
  return await userRepository.deleteUserById(userId);
};

export const authService = {
  register,
  login,
  generateToken,
  getUserById,
  deleteUser,
};
