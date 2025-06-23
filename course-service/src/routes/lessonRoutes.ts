import { Router } from 'express';
import { lessonController } from '../controllers/lessonController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get(`/courses/:courseId/lessons`, lessonController.getLessonsByCourse);
router.get(`/lessons/:id`, lessonController.getLessonById);

router.post(`/lessons`, authenticateJWT, lessonController.createLesson);
router.put(`/lessons/:id`, authenticateJWT, lessonController.updateLesson);
router.delete(`/lessons/:id`, authenticateJWT, lessonController.deleteLesson);

export const lessonRoutes = router;
