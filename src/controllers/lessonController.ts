import { Request, Response } from 'express';
import { lessonService } from '../services/lessonService';

export const lessonController = {
  async getLessonsByCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      const lessons = await lessonService.getLessonsByCourse(courseId);
      res.status(200).json(lessons);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при получении уроков' });
    }
  },

  async getLessonById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lesson = await lessonService.getLessonById(id);
      if (!lesson) {
        res.status(404).json({ message: 'Урок не найден.' });
        return;
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении урока.' });
    }
  },

  async createLesson(req: Request, res: Response) {
    try {
      const lesson = await lessonService.createLesson(req.body);
      res.status(201).json(lesson);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при создании урока' });
    }
  },

  async updateLesson(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } =  req.body
      const updated = await lessonService.updateLesson(id, body);
      if (!updated) {
         res.status(404).json({ message: 'Урок не найден' });
        return
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при обновлении урока' });
    }
  },



  async deleteLesson(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await lessonService.deleteLesson(id);
      if (!deleted) { 
        res.status(404).json({ message: 'Урок не найден' });
        return
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при удалении урока' });
    }
  },
};
