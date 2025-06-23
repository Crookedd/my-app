import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollmentService';
import { getChannel } from '../rabbit';

export const enrollmentController = {
  async enrollUser(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { courseId } = req.params;

      if (!userId || !courseId) {
        res.status(400).json({ message: 'Необходимо передать courseId в параметрах' });
        return;
      }
      const enrollment = await enrollmentService.enroll(userId, courseId);
      getChannel().sendToQueue(
        'event.course.enrolled',
        Buffer.from(
          JSON.stringify({
            courseId,
            userId,
            enrollmentId: enrollment._id,
          }),
        ),
        { persistent: true },
      );
      res.status(201).json(enrollment);
    } catch (err) {
      console.error('Ошибка при записи на курс:', err);
      res.status(500).json({ error: 'Ошибка при записи на курс' });
    }
  },

  async getCourseProgress(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { courseId } = req.params;

      if (!userId) {
        res.status(403).json({ message: 'Пользователь не аутентифицирован' });
        return;
      }

      const result = await enrollmentService.getProgress(userId, courseId);
      if (!result) {
        res.status(404).json({ message: 'Запись не найдена' });
        return;
      }

      res.status(200).json(result);
    } catch (err) {
      console.error('Ошибка получения прогресса:', err);
      res.status(500).json({ error: 'Ошибка при получении прогресса' });
    }
  },

  async completeLesson(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { courseId, lessonId } = req.params;

      if (!userId) {
        res.status(403).json({ message: 'Пользователь не аутентифицирован' });
        return;
      }

      if (!lessonId || !courseId) {
        res.status(400).json({ message: 'Нужны courseId и lessonId в параметрах' });
        return;
      }

      const result = await enrollmentService.completeLesson(userId, courseId, lessonId);
      getChannel().sendToQueue(
        'event.lesson.completed',
        Buffer.from(
          JSON.stringify({
            courseId,
            lessonId,
            userId,
          }),
        ),
        { persistent: true },
      );
      res.status(200).json(result);
    } catch (err) {
      console.error('Ошибка при завершении урока:', err);
      res.status(500).json({ error: 'Ошибка при завершении урока' });
    }
  },

  async uncompleteLesson(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { courseId, lessonId } = req.params;

      if (!userId) {
        res.status(403).json({ message: 'Пользователь не аутентифицирован' });
        return;
      }

      if (!lessonId || !courseId) {
        res.status(400).json({ message: 'Нужны courseId и lessonId в параметрах' });
        return;
      }

      const result = await enrollmentService.uncompleteLesson(userId, courseId, lessonId);
      getChannel().sendToQueue(
        'event.lesson.uncompleted',
        Buffer.from(
          JSON.stringify({
            courseId,
            lessonId,
            userId,
          }),
        ),
        { persistent: true },
      );
      res.status(200).json(result);
    } catch (err) {
      console.error('Ошибка при отмене завершения урока:', err);
      res.status(500).json({ error: 'Ошибка при отмене завершения урока' });
    }
  },

  async getEnrollmentStats(req: Request, res: Response) {
    try {
      const { courseId } = req.params;

      const count = await enrollmentService.getEnrollmentStats(courseId);
      res.status(200).json({ enrolledCount: count });
    } catch (err) {
      console.error('Ошибка при получении статистики:', err);
      res.status(500).json({ error: 'Ошибка при получении статистики записей' });
    }
  },
};
