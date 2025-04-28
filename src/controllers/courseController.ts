import { Request, Response } from 'express';
import { courseService } from '../services/courseService';

export const courseController = {
  async getCourses(req: Request, res: Response) {
    try {
      const { title, category, level, published } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const filters = {
        title: title as string,
        category: category as string,
        level: level as string,
        published: published === 'true' ? true : published === 'false' ? false : undefined,
      };

      const result = await courseService.getAllCourses(filters, page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении курсов.' });
    }
  },

  async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await courseService.getCourseById(id);
      if (!course) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении курса.' });
    }
  },

  async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании курса.' });
    }
  },

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await courseService.updateCourse(id, req.body);
      if (!course) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обновлении курса.' });
    }
  },

  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await courseService.deleteCourse(id);
      if (!course) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при удалении курса.' });
    }
  },
};
