import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { getChannel } from '../rabbit';

const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Пользователь не прошел проверку подлинности.' });
      return;
    }

    const user = await authService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Пользователь не прошел проверку подлинности.' });
      return;
    }

    await authService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, username, password, role } = req.body;
    const newUser = await authService.register(firstName, lastName, username, password, role);
    
    const channel = getChannel();
    if (channel) {
      channel.sendToQueue('user_created', Buffer.from(JSON.stringify({ userId: newUser._id })));
    }
    
    res.status(201).json({ id: newUser._id, user: newUser });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'УПС! Произошла ошибка' });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    const token = authService.generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'УПС! Произошла ошибка' });
    }
  }
};

export const authController = {
  getUserData,
  deleteUser,
  register,
  login,
};

