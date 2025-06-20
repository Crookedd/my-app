import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollmentService';

export const enrollmentController = {
  async enroll(req: Request, res: Response) {
    const userId = req.user?.userId;
    const courseId = req.params.courseId;

    if (!userId) {
        res.status(403).json({ message: 'Пользователь не аутентифицирован' });
        return
    }

    try {
      const enrollment = await enrollmentService.enrollUserToCourse(userId, courseId);
      res.status(201).json(enrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getUserEnrollments(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(403).json({ message: 'Пользователь не аутентифицирован' });
      return
    }

    try {
      const enrollments = await enrollmentService.getEnrollmentsByUser(userId);
      res.status(200).json(enrollments);
    } catch (err) {
      res.status(500).json({ message: 'Ошибка при получении записей на курсы' });
    }
  },

  async unenroll(req: Request, res: Response) {
    const userId = req.user?.userId;
    const courseId = req.params.courseId;

    if (!userId) {
      res.status(403).json({ message: 'Пользователь не аутентифицирован' });
      return 
    }

    try {
      const result = await enrollmentService.unenrollUser(userId, courseId);
      if (result) {
        res.status(200).json({ message: 'Пользователь отписан от курса' });
      } else {
        res.status(404).json({ message: 'Запись не найдена' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Ошибка при отписке от курса' });
    }
  },
};