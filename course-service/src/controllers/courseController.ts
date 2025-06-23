import { Request, Response } from 'express';
import { courseService } from '../services/courseService';
import Tag from '../models/tag';

interface CourseFilters {
  title?: string;
  category?: string;
  level?: string;
  published?: boolean;
  tags?: string[];
}

export const courseController = {
  async getCourses(req: Request, res: Response) {
    try {
      const { title, category, level, published, tags } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const filters: CourseFilters = {
        title: typeof title === 'string' ? title : undefined,
        category: typeof category === 'string' ? category : undefined,
        level: typeof level === 'string' ? level : undefined,
        published: published === 'true' ? true : published === 'false' ? false : undefined,
        tags: tags
          ? Array.isArray(tags)
            ? tags.map((tag) => String(tag))
            : [String(tags)]
          : undefined,
      };

      const result = await courseService.getAllCourses(filters, page, limit);
      res.status(200).json(result);
    } catch (error) {
      console.error('Ошибка при получении курсов:', error);
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
      if (req.body.tags && Array.isArray(req.body.tags)) {
        const tagIds = await Promise.all(
          req.body.tags.map(async (tag: string) => {
            const existingTag = await Tag.findOne({ name: tag.trim() });
            if (existingTag) {
              return existingTag._id;
            } else {
              const newTag = new Tag({ name: tag.trim() });
              const savedTag = await newTag.save();
              return savedTag._id;
            }
          }),
        );
        req.body.tags = tagIds;
      }

      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      console.error('Ошибка при создании курса:', error);
      res.status(500).json({ error: 'Ошибка при создании курса.' });
    }
  },

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (req.body.tags && Array.isArray(req.body.tags)) {
        const tagIds = await Promise.all(
          req.body.tags.map(async (tag: string) => {
            const existingTag = await Tag.findOne({ name: tag.trim() });
            if (existingTag) {
              return existingTag._id;
            } else {
              const newTag = new Tag({ name: tag.trim() });
              const savedTag = await newTag.save();
              return savedTag._id;
            }
          }),
        );
        req.body.tags = tagIds;
      }

      const course = await courseService.updateCourse(id, req.body);
      if (!course) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res.status(200).json(course);
    } catch (error) {
      console.error('Ошибка при обновлении курса:', error);
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

  async addToFavorites(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(403).json({ message: 'Доступ запрещен. Пользователь не аутентифицирован.' });
        return;
      }

      const courseData = await courseService.addToFavorites(id, userId);
      if (!courseData) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res.status(200).json(courseData);
    } catch (error) {
      console.error('Ошибка при добавлении курса в избранное:', error);
      res.status(500).json({ error: 'Ошибка при добавлении курса в избранное.' });
    }
  },

  async removeFromFavorites(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(403).json({ message: 'Доступ запрещен. Пользователь не аутентифицирован.' });
        return;
      }

      const removedCourseId = await courseService.removeFromFavorites(id, userId);
      if (!removedCourseId) {
        res.status(404).json({ message: 'Курс не найден.' });
        return;
      }
      res
        .status(200)
        .json({ message: 'Курс успешно удален из избранного.', courseId: removedCourseId });
    } catch (error) {
      console.error('Ошибка при удалении курса из избранного:', error);
      res.status(500).json({ error: 'Ошибка при удалении курса из избранного.' });
    }
  },
};
