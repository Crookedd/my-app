import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

const registerUser = async (firstName: string, lastName: string, username: string, password: string, role: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ firstName, lastName, username, password: hashedPassword, role });
  await newUser.save();
  return newUser;
};

const loginUser = async (username: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};


const getUserById = async (userId: string) => {
  return await User.findById(userId).select("-password"); // исключаем пароль из результата
};

const deleteUser = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

export const authService = {
  registerUser,
  loginUser,
  generateToken,
  getUserById,
  deleteUser,
};
