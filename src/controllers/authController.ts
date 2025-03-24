import { Request, Response } from "express";
import { authService } from "../services/authService";

const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const user = await authService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};


const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id; // Используем _id из req.user
    if (!userId) {
      res.status(401).json({ message: "User not authenticated." });
      return; // Не забывайте возвращать
    }

    await authService.deleteUser(userId);
    res.status(204).send(); // Успешное удаление
  } catch (error) {
    res.status(400).json({ error });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, username, password, role } = req.body;
    const newUser = await authService.registerUser(firstName, lastName, username, password, role);
    res.status(201).json(newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};


const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);
    const token = authService.generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};
export const authController = {
  getUserData,
  deleteUser,
  register,
  login,
};

