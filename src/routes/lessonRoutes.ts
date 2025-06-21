import { Router } from 'express';
import { lessonController } from '../controllers/lessonController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { API_BASE_PATH } from '../config/constants';

const router = Router();

router.get(`${API_BASE_PATH}/courses/:courseId/lessons`, lessonController.getLessonsByCourse);
router.get(`${API_BASE_PATH}/lessons/:id`, lessonController.getLessonById);

router.post(`${API_BASE_PATH}/lessons`, authenticateJWT, lessonController.createLesson);
router.put(`${API_BASE_PATH}/lessons/:id`, authenticateJWT, lessonController.updateLesson);
router.delete(`${API_BASE_PATH}/lessons/:id`, authenticateJWT, lessonController.deleteLesson);

export const lessonRoutes = router;
